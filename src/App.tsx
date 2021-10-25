import * as React from "react";
import { MyComponent } from "./my-component";

interface Props {
  name: string;
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>Hello {name}</h1>
        <MyComponent />
      </>
    );
  }
}

export default App;
