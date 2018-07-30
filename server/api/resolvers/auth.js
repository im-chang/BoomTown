const { AuthenticationError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function setCookie({ tokenName, token, res }) {
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for attaching a cookie to the HTTP
   *  response. 'apollo-server-express' handles returning the response to the client.
   *  We added the 'req' object to the resolver context so we can use it to atttach the cookie.
   *  The 'req' object comes from express.
   *
   *  A secure cookie that can be used to store a user's session data has the following properties:
   *  1) It can't be accessed from JavaScript
   *  2) It will only be sent via https (but we'll have to disable this in development using NODE_ENV)
   *  3) A boomtown cookie should oly be valid for 2 hours.
   */
  // Refactor this method with the correct configuration values.
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 //2h
    // @TODO: Supply the correct configuration values for our cookie here
  })
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user // Omit the password from the token
  return  jwt.sign({ id, email, fullname, bio }, secret, { expiresIn: '1h' });
}

module.exports = function(app) {
  return {
    async signup(parent, args, context) {
      try {
        const hashedPassword = await bcrypt.hash(args.user.password, 10)

        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        })

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        })

        return {
          id: user.id
        }

      } catch (e) {
        throw new AuthenticationError(e)
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(args.user.email)
        const valid = await bcrypt.compare(args.user.password, user.password)
        if (!valid || !user) throw 'User was not found.'

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        })

        return {
          id: user.id
        }
      } catch (e) {
        throw new AuthenticationError(e)
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'))
      return true
    }
  }
}
