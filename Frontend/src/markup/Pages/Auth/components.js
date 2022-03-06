import {Button, withStyles} from "@material-ui/core";

export const GoogleLoginButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        fontWeight:300,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.8,
        backgroundColor: 'white',
        borderColor: '#dd4b39',
        color:'#dd4b39',
        '&:hover': {
            backgroundColor: '#dd4b39',
            boxShadow: 'none',
            color:'white',
            fontWeight:400,
        },
    },
})(Button);

export const FacebookLoginButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        fontWeight:300,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.8,
        backgroundColor: 'white',
        borderColor: '#3b5998',
        color:'#3b5998',
        '&:hover': {
            backgroundColor: '#3b5998',
            boxShadow: 'none',
            color:'white',
            fontWeight:400,
        },
    },
})(Button);

export const RunnerButton = withStyles({
    root:{
        textTransform: 'none',
        width: "45%"
    },
    contained:{
        background: '#47bb67',
        color: "white",
        outline:'none',
        '&:hover': {
            background: '#47bb67',
            color: "white",
            fontWeight:400,
        },
        '&:focus': {
            outline:'none',
        },
        '&:active': {
            outline:'none',
        }
    },
    outlined:{
        background: '#f2f2f2',
        borderColor: '#f2f2f2',
        color: '#8a8a8a',
        '&:hover': {
            background: '#deefe1',
            color: '#38b65b',
            fontWeight: 400,
        },
        '&:focus': {
            outline:'none',
        },
        '&:active': {
            outline:'none',
        }
    },
})(Button);