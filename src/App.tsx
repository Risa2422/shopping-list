import React, { useReducer, useRef } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

type Props = {};

function App({}: Props) {
  type shoppingItems = {
    id: number;
    itemName: string;
    isChecked: boolean;
    isEdit: boolean;
    editItemName: string;
  };

  type State = {
    inputItem: string;
    shoppingItems: shoppingItems[];
  };

  type actionType =
    | { type: "change"; payload: string }
    | { type: "add" }
    | { type: "delete"; payload: number }
    | { type: "edit"; payload: number }
    | { type: "checked"; payload: number }
    | { type: "edit"; payload: number }
    | { type: "editInput"; payload: { id: number; name: string } };

  const initialValue: State = {
    inputItem: "",
    shoppingItems: [],
  };

  const counterRef = useRef(0);

  function reducer(state: State, action: actionType): State {
    switch (action.type) {
      case "change":
        return { ...state, inputItem: action.payload };

      case "add":
        const newItem = {
          id: counterRef.current,
          itemName: state.inputItem,
          isChecked: false,
          isEdit: false,
          editItemName: state.inputItem,
        };

        counterRef.current++;

        return {
          ...state,
          shoppingItems: [...state.shoppingItems, newItem],
          inputItem: "",
        };

      case "delete":
        const newState = state.shoppingItems.filter(
          (item) => item.id !== action.payload
        );
        return { ...state, shoppingItems: newState };

      case "checked":
        const isChecked = state.shoppingItems.map((item) =>
          item.id === action.payload
            ? { ...item, isChecked: !item.isChecked }
            : item
        );

        return { ...state, shoppingItems: isChecked };

      case "edit":
        const isEdit = state.shoppingItems.map((item) =>
          item.id === action.payload ? { ...item, isEdit: !item.isEdit } : item
        );

        return { ...state, shoppingItems: isEdit };

      case "editInput":
        const editItem = state.shoppingItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                editItemName: action.payload.name,
                itemName: action.payload.name,
              }
            : item
        );

        return { ...state, shoppingItems: editItem };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialValue);

  /* Event */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "change", payload: e.target.value });
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: "add" });
  };

  const handleOnDelete = (id: number) => {
    dispatch({ type: "delete", payload: id });
  };

  const handleToggle = (id: number) => {
    dispatch({ type: "checked", payload: id });
  };

  const handleOnEdit = (id: number) => {
    dispatch({ type: "edit", payload: id });
  };

  const handleOnEditInput = (id: number, name: string) => {
    dispatch({ type: "editInput", payload: { id, name } });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, id: number) => {
    if (e.key === "Enter") {
      dispatch({ type: "edit", payload: id });
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100vw",
        height: "100vh",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2e4f66",
      }}
    >
      <Box
        component="section"
        sx={{
          width: "400px",
          height: "300px",
          p: 4,
          border: "1px solid grey",
          background: "white",
        }}
      >
        <Typography variant="h4" sx={{ color: "black" }}>
          What to buy
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Input
            placeholder="Type an item name"
            required
            onChange={handleOnChange}
            value={state.inputItem}
            sx={{ width: "300px" }}
          />
          <Button
            type="button"
            sx={{
              color: red[300],
              border: "solid 1px #8c8989",
              "&:hover": {
                color: "#fbf6f6",
                bgcolor: red[300],
                border: "solid 1px #8c8989",
              },
            }}
            onClick={handleOnClick}
          >
            Add
          </Button>
        </Stack>
        <List
          sx={{
            margin: "15px 0px",
            width: "100%",
            height: "200px",
            overflowY: "auto",
            bgcolor: "background.paper",
          }}
        >
          {state.shoppingItems.map((item) => {
            const labelId = `checkbox-list-label-${item.id}`;
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOnDelete(item.id)}
                      sx={{ minWidth: 0, padding: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOnEdit(item.id)}
                      sx={{ minWidth: 0, padding: 1 }}
                    >
                      <Edit fontSize="small" />
                    </Button>
                  </Stack>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={
                    !item.isEdit ? () => handleToggle(item.id) : undefined
                  }
                  dense
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <Checkbox
                      edge="start"
                      checked={item.isChecked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      sx={{ minWidth: 0 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={item.itemName}
                    sx={{ color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}

export default App;
