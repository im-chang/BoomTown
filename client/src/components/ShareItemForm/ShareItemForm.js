import React, { Component } from 'react'
import { FormSpy, Form, Field } from 'react-final-form'
import { Button, TextField, Checkbox, InputLabel } from '@material-ui/core'
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
      fileSelected: false,
      selectedTags: [],
      submitted: false
    }
  }
  onSubmit = values => {
    console.log(values)
  }
  validate = values => {
    console.log(values)
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
  }
  
  render() {
    const { resetImage, updateNewItem, resetNewItem } = this.props
    return (
      <ItemsContainer>
              {({ tagData: { tags, loading, error } }) => {
                if (loading) {
                  return 'Content Loading...'
                }
                if (error) {
                  return `error: ${error.message}`
                }
      return (
      <Form
      onSubmit={this.onSubmit}
        validate={this.validate}
        render={({ handleSubmit, pristine, invalid, values }) => (
          <form onSubmit={handleSubmit}>
            <FormSpy
              subscription={{ values: true }}
              component={({ values }) => {
                if (values) {
                  this.dispatchUpdate(values, tags, updateNewItem)
                }
                return ''
              }}
            />
            <Field
              render={({ input, meta }) => (
                <Button variant="contained" color="primary">
                  Select an image
                </Button>
              )}
            />
            <Field name="Title">
              {({ input, meta }) => (
                <TextField placeholder="Name your Item" {...input} />
              )}
            </Field>
            <Field name="Description">
              {({ input, meta }) => (
                <TextField
                  placeholder="Describe your Item"
                  multiline
                  {...input}
                />
              )}
            </Field>
                {tags && tags.map(tag => (
                  <Field
                    name="tags"
                    type="checkbox"
                    key= {tag.id}
                    value={JSON.stringify(tag)}
                  >
                    {({ input, meta }) => (
                      <InputLabel key={tag.id}>
                        <Checkbox onChange={event => this.setState({
                          selectedTags: [event.target.value]
                        })} value={input.value} {...input} />
                        {tag.title}
                      </InputLabel>
                    )}
                  </Field>
                ))
              }}
            <Field
              render={({ input, meta }) => (
                <Button type="submit" variant="contained" color="primary">
                  Share
                </Button>
              )}
            />
            <pre>{JSON.stringify(values, 0, 2)}</pre>
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