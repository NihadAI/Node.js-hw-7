import App from "./src/App";
import Container from "typedi";
import NewsController from "./src/controllers/NewsController";
import convictConfig from "./src/utils/convictConfig";
import AuthController from "./src/controllers/AuthController";

const main = async () => {
  const port = convictConfig.get('PORT');
  const host = convictConfig.get('HOST');

  const app = new App([Container.get(NewsController), Container.get(AuthController)], port, host);
  console.log(Container.get(NewsController));
  
  app.listen();
};

main().catch((error) => {
  console.error(error);
});

