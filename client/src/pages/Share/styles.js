const styles = theme => ({
  body: {
    marginTop: '2rem',
    paddingTop: '3rem',
    backgroundColor: 'white',
    height: '100vh'
  },
  SharePage: {
    display: 'grid',
    backgroundColor: 'white',
    gridGap: '3rem',
    [theme.breakpoints.up('xs')]: {
      backgroundColor: 'white'
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      marginTop: '10rem',
      marginBottom: 0,
      margin: '2rem'
    },
    [theme.breakpoints.up('md')]: {
      marginRight: '5rem',
      marginLeft: '5rem'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '10rem',
      margin: '20rem',
      marginBottom: 0
    },
    cardContainer: {
      height: '100%'
    }
  },

  card: {
    width: '100%'
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
