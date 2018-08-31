const styles = theme => ({
  body: {
    marginTop: '5rem',
    marginBottom: '5rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    [theme.breakpoints.up('lg')]: {
      margin: '9rem',
      marginTop: '5rem',
      marginBottom: '5rem'
    }
  },
  itemCard: {
    maxWidth: 345,
    margin: '1rem'
  },
  shared: {
    color: '#f9a825',
    marginBottom: 0
  }
})

export default styles
