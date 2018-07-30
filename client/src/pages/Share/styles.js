const styles = theme => ({

SharePage: {
    display: 'grid',
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '1fr 1fr',
    }
}

})

export default styles
