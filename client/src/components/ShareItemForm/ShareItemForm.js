import React, { Component, Fragment } from 'react'
// import { withStyles } from '@material-ui/core/styles'
import { FormSpy, Form, Field } from 'react-final-form'
import {
  Button,
  TextField,
  Checkbox,
  Typography,
  Select,
  Input,
  MenuItem,
  ListItemText
} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../../redux/Modules/ShareItemPreview'

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagError: false,
      fileSelected: false,
      selectedTags: [],
      submitted: false,
      haveTag: false,
      haveImage: false,
      haveText: false,
      submitMessage: false
    }
    this.fileRef = React.createRef()
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ')
  }

  handleShareReset(resetImage, resetNewItem) {
    this.setState({ selectedTags: [] })
    this.setState({ fileSelected: false })
    resetImage()
    resetNewItem()
    this.handleSubmitMessage()
  }
  validate = values => {
    const errors = {}
    this.setState({ submitMessage: false })
    if (!values.title) {
      errors.title = 'Required'
      this.setState({ haveText: false })
    }
    if (!values.description) {
      errors.description = 'Required'
      this.setState({ haveText: false })
    }
    if (values.description && values.title) {
      this.setState({ haveText: true })
    }

    return errors
  }

  handleSubmitMessage() {
    this.setState({ submitMessage: true })
  }

  validateTags() {
    if (!this.state.tagsPristine && this.state.selectedTags.length === 0) {
      this.setState({ tagError: true })
      this.setState({ haveTag: false })
    } else {
      this.setState({ tagError: false })
      this.setState({ haveTag: true })
    }
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.mimeType};base64, ${btoa(
            e.target.result
          )}`
        )
      }
      reader.readAsBinaryString(this.state.fileSelected)
    })
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
        .map(tag => ({ title: tag.title, id: tag.id }))
    )
  }

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        })
      })
    }

    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    })
  }

  handleCheckbox(event) {
    this.setState({
      selectedTags: event.target.value
    })
    this.validateTags()
  }

  handleImageSelect = event => {
    this.setState({ fileSelected: event.target.files[0] })
    this.setState({ haveImage: true })
  }

  async saveItem(values, tags, addItem) {
    const {
      validity,
      files: [file]
    } = this.fileRef.current

    if (!validity.valid || !file) return

    try {
      const itemData = {
        ...values,
        tags: this.applyTags(tags)
      }
      await addItem.mutation({
        variables: {
          item: itemData,
          image: file
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { classes, resetImage, updateNewItem, resetNewItem } = this.props
    return (
      <ItemsContainer>
        {({ addItem, tagData: { tags, loading, error } }) => {
          if (loading) {
            return 'Content Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return (
            <Form
              onSubmit={values => {
                this.saveItem(values, tags, addItem)
              }}
              validate={this.validate}
              render={({
                handleSubmit,
                pristine,
                invalid,
                values,
                form,
                reset,
                submitting
              }) => (
                <form
                  onSubmit={event => {
                    handleSubmit(event)
                    form.reset()
                    this.handleShareReset(resetImage, resetNewItem)
                  }}
                  id="shareItemForm"
                >
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, tags, updateNewItem)
                      }
                      return ''
                    }}
                  />
                  <Typography variant="display1" style={{ marginTop: '2rem' }}>
                    Share. Borrow. Prosper.
                  </Typography>
                  <Field
                    name="imageurl"
                    render={({ input, meta }) => (
                      <Fragment>
                        <Button
                          color="primary"
                          variant="contained"
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '2rem'
                          }}
                          onClick={() => {
                            this.fileRef.current.click()
                          }}
                        >
                          Select an image
                        </Button>
                        <input
                          onChange={e => this.handleImageSelect(e)}
                          type="file"
                          accept="image/*"
                          hidden
                          ref={this.fileRef}
                        />
                      </Fragment>
                    )}
                  />
                  <Field name="title">
                    {({ input, meta }) => (
                      <TextField
                        style={{
                          width: '100%',
                          marginTop: '2rem',
                          marginBottom: '2rem'
                        }}
                        placeholder="Name your Item"
                        {...input}
                      />
                    )}
                  </Field>
                  <Field name="description">
                    {({ input, meta }) => (
                      <TextField
                        style={{ width: '100%', marginBottom: '2rem' }}
                        placeholder="Describe your Item"
                        multiline
                        {...input}
                      />
                    )}
                  </Field>
                  <div style={{ marginBottom: '2rem' }}>
                    <label>
                      <b>Tags:</b>
                    </label>
                    <Select
                      multiple
                      style={{ width: '100%' }}
                      value={this.state.selectedTags}
                      onChange={event => this.handleCheckbox(event)}
                      input={<Input />}
                      renderValue={selected => {
                        return this.generateTagsText(tags, selected)
                      }}
                    >
                      {tags &&
                        tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.id}>
                            <Checkbox
                              checked={
                                this.state.selectedTags.indexOf(tag.id) > -1
                              }
                            />
                            <ListItemText primary={tag.title} />
                          </MenuItem>
                        ))}
                      }
                    </Select>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ marginBottom: '2rem' }}
                      disabled={
                        !(
                          this.state.haveText &&
                          this.state.haveImage &&
                          this.state.haveTag
                        )
                      }
                    >
                      Share
                    </Button>

                    <Typography variant="title">
                      {this.state.submitMessage
                        ? 'Thank your for the submission!'
                        : ''}
                    </Typography>
                  </div>
                </form>
              )}
            />
          )
        }}
      </ItemsContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item))
  },
  resetNewItem() {
    dispatch(resetNewItem())
  },
  resetImage() {
    dispatch(resetImage())
  }
})

export default connect(
  undefined,
  mapDispatchToProps
)(ShareItemForm)
