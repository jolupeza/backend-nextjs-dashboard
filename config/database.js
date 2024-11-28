import mongoose from "mongoose"

const { NODE_ENV, MONGO_DB_URI } = process.env

const connectionString = MONGO_DB_URI

export const connection = () => {
  if (!connectionString) {
    console.error(
      "Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string.",
    )
  }

  mongoose
    .connect(connectionString)
    .then(() => console.info("Database connected"))
    .catch((error) => console.error)

  process.on("uncaughtException", (error) => {
    console.error(error)

    mongoose.disconnect()
  })
}
