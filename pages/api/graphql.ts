import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors"
import { typeDefs } from "../../graphql/typeDefs";
import {resolvers} from "../../graphql/resolvers";
import {context} from "../../graphql/context";
import { NextApiHandler } from "next";
import { RequestHandler } from "micro";

const cors = Cors();

export const config ={
    api:{
        bodyParser:false
    }
}

const apolloserver = new ApolloServer({typeDefs,resolvers,context});
const startserver = apolloserver.start();

const handler:NextApiHandler = async (req,res)=>{
  if(req.method==='OPTIONS'){
    res.end();
    return false;
  }

  await startserver;
  const apolloHandle = apolloserver.createHandler({
      path: '/api/graphql',
  })
  return apolloHandle(req,res);
}

export default cors(handler as RequestHandler)