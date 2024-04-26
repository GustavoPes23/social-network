import { messages as defaultMessages } from "./utils/messages";


import Notifications from "./components/notifications/Notifications";

function App() {
  return <Notifications defaultMessages={defaultMessages}/>;
}

export default App;
