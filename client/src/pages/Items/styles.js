const styles = theme => ({

Items: {
    backgroundColor: '#212121',
    display: 'grid',
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('xs')]: {
        padding: 16,
    },
    
}


})


export default styles
