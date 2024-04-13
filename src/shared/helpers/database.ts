export function getMongoDBURL(
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string
): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
