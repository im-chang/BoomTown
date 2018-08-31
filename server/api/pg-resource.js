var strs = require('stringstream')

function tagsQueryString(tags, itemid, result) {
  const length = tags.length
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        )
}

module.exports = function(postgres) {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [fullname, email, password]
      }
      try {
        const user = await postgres.query(newUserInsert)
        return user.rows[0]
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.'
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.'
          default:
            throw 'There was a problem creating your account.'
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      }
      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found.'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id]
      }

      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found.'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
    },
    async getItems(idToOmit) {
      let text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
      FROM items item
      INNER JOIN uploads up
      ON up.itemid = item.id`
      if (idToOmit) {
        text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
        FROM items item
        INNER JOIN uploads up
        ON up.itemid = item.id
        WHERE item.ownerid != $1 AND item.borrowerid is NULL`
      }

      try {
        const items = await postgres.query({
          text: text,
          values: idToOmit ? [idToOmit] : []
        })

        return items.rows
      } catch (e) {
        console.log(e)
        throw 'Items were not found.'
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
          FROM items item
          INNER JOIN uploads up
          ON up.itemid = item.id
          WHERE ownerid = $1`,
          values: [id]
        })
        if (!items) throw 'Items not found'
        return items.rows
      } catch (e) {
        throw 'Items not found.'
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
          FROM items item
          INNER JOIN uploads up
          ON up.itemid = item.id 
          WHERE borrowerid = $1`,
          values: [id]
        })
        if (!items) throw 'Items not found.'
        return items.rows
      } catch (e) {
        throw 'Items not found.'
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query({
          text: `SELECT * FROM tags`
        })
        if (!tags) throw 'Tags not found.'
        return tags.rows
      } catch (e) {
        throw 'Tags not found.'
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `
        SELECT tag.id as id, tag.title as title
        FROM items item
        JOIN itemtags itemtag ON item.id=itemtag.itemid
        JOIN tags tag ON itemtag.tagid=tag.id
        WHERE item.id= $1;`,
        values: [id]
      }
      try {
        const tags = await postgres.query(tagsQuery)
        if (!tags) throw 'Tags not found.'
        return tags.rows
      } catch (e) {
        throw 'Tags not found.'
      }
    },
    async saveNewItem({ item, image, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', err => {
              const imageStream = image.stream.pipe(strs('base64'))

              let base64Str = 'data:image/*;base64,'
              imageStream.on('data', data => {
                base64Str += data
              })

              imageStream.on('end', async () => {
                const { title, description, tags } = item

                const newItemInsert = {
                  text: `
                    INSERT INTO items (title,description, ownerid) VALUES ($1, $2, $3)
                    RETURNING *`,
                  values: [title, description, user.id]
                }

                const newItem = await client.query(newItemInsert)
                const itemid = newItem.rows[0].id

                const imageUploadQuery = {
                  text:
                    'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  values: [
                    itemid,
                    image.filename,
                    image.mimetype,
                    'base64',
                    base64Str
                  ]
                }
                try {
                  await client.query(imageUploadQuery)
                } catch (e) {
                  console.log(e)
                }
                const tagsQuery = {
                  text: `
                    INSERT INTO itemtags(tagid, itemid) VALUES ${tagsQueryString(
                      [...tags],
                      itemid,
                      ''
                    )}`,
                  values: tags.map(tag => tag.id)
                }
                try {
                  await client.query(tagsQuery)
                } catch (e) {
                  console.log(e)
                }

                client.query('COMMIT', err => {
                  if (err) {
                    throw err
                  }
                  done()
                  resolve(newItem.rows[0])
                })
              })
            })
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err
              }
              done()
            })
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.'
              default:
                throw e
            }
          }
        })
      })
    }
  }
}
