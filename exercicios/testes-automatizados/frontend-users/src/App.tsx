import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { UserCreate, UserEdit, UserList } from "./UserResource";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("http://localhost:3000");

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} >
    <Resource name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
    />
  </Admin>
);
