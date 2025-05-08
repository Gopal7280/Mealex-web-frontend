import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
export function ConfirmDialog({open,onClick,onClick1,text}){
    return(
        <Dialog
                open={open}
                onClose={onClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {`Generate ${text}`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                   By clicking ohk you will be redirected to generate {text} 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onClick}>Disagree</Button>
                  <Button onClick={onClick1} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
    )
}