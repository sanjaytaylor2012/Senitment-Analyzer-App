import { Form, Button } from "react-bootstrap";
import { useRef } from "react";
import React from "react";
import { useForms } from "../contexts/formContext";

export function FormInput() {
  const { setterInput, setterText } = useForms();
  const inputRef = useRef();

  return (
    <Form>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Control ref={inputRef} type="text" placeholder="Enter text" />
      </Form.Group>
      <Form.Group className="text-center">
        <Button
          onClick={async (event) => {
            event.preventDefault();
            const text = inputRef.current.value;
            setterText(inputRef.current.value);
            let response = await fetch("/api", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(text),
            })
              .then((response) => response.json())
              .then((data) => {
                return data["prediction"];
              });
            setterInput(response);
          }}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
