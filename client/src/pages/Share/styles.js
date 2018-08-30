const styles = theme => ({
  SharePage: {
    display: 'grid',
    [theme.breakpoints.up('xs')]: {
      backgroundColor: 'white'
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      backgroundColor: '#212121'
    }
  },

  SharePreview: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  ShareForm: {
    padding: 10
  }
})

export default styles
