import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function ResponseText(props) {

  const logs = props.response[0].info;
  const id = props.response[0].id;

  const useStyles = makeStyles((theme) => ({
    logs: {
      color: "#039",
      border: "1px solid blue",
      fontSize: "18px",
      fontFamily: "Times New Roman",
      backgroundColor: "#dadada",
      padding: "10px 12px",
      textAlign: "left"
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <p >
        הלוגים עבור האדם שמזוהה עם המספר {id}  הם:
      </p >
        { logs.map(notification => <p className={classes.logs}>{ notification }</p>) }   
    </div>
  );
}