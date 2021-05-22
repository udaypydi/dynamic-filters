import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import AttributeList from "../attributelist";
import Footer from '../footer';

function Modal({ onModalClose }) {
  return (
    <Dialog
      maxWidth="lg"
      open
      onClose={onModalClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick={true}
    >
      <DialogContent id="customized-dialog-title">
        <div style={{ minWidth: 800, position: 'relative' }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minWidth: 600
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <p>Filter Name</p>
              <input
                style={{
                  padding: 5,
                  width: 200,
                  marginLeft: 10,
                  borderRadius: 5,
                  borderWidth: 1
                }}
              />
            </div>
            <Tooltip disableFocusListener title="Close">
              <IconButton aria-label="close">
                <CloseIcon onClick={onModalClose} />
              </IconButton>
            </Tooltip>
          </div>
          <AttributeList />
          <Footer />
        </div>
        
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(Modal);
