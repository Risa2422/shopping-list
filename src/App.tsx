import React, { useReducer, useRef, useState } from "react";
import { Button, colors, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";

type Props = {};

function App({}: Props) {
  type shoppingItems = {
    id: number;
    itemName: string;
    isChecked: boolean;
  };

  type State = {
    inputItem: string;
    shoppingItems: shoppingItems[];
  };

  type ItemActionType = {
    type: string;
    payload: string;
  };

  const initialValue: State = {
    inputItem: "",
    shoppingItems: [],
  };

  const counterRef = useRef(0);

  function reducer(state: State, action: ItemActionType): State {
    switch (action.type) {
      case "change":
        return { ...state, inputItem: action.payload };

      case "add":
        const newItem = {
          id: counterRef.current,
          itemName: state.inputItem,
          isChecked: false,
        };

        counterRef.current++;

        return {
          ...state,
          shoppingItems: [...state.shoppingItems, newItem],
          inputItem: "",
        };

      case "delete":
        return state;

      case "edit":
        return state;

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
    dispatch({ type: "add", payload: "" });
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
          p: 3,
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
        <FormGroup sx={{ height: "150px", overflowY: "auto" }}>
          <Box component="ul" sx={{ padding: "10px" }}>
            {state.shoppingItems.map((item) => (
              <Box component="li" key={item.id} sx={{ listStyle: "none" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={item.itemName}
                  sx={{ color: "black" }}
                />
              </Box>
            ))}
          </Box>
        </FormGroup>
      </Box>
    </Container>
  );
}

export default App;
