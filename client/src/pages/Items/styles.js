const styles = theme => ({
  body: {
    backgroundColor: '#212121',
    paddingTop: '5rem',
    paddingBottom: '5rem'
  },
  Items: {
    [theme.breakpoints.up('xs')]: {
      padding: 16
    },
    height: '100%'
  }
})

export default styles
