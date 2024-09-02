import { AppProvider } from "./AppContext";
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";

export default function App() {
  return (
    <AppProvider>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </AppProvider>
  );
}
