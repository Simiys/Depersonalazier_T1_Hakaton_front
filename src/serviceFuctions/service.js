export function parseConnectionString(connectionString) {
  console.log(connectionString);
  const regex =
    /^(?<protocol>[^:]+):\/\/(?<username>[^:]+):(?<password>[^@]+)@(?<host>[^:]+):(?<port>\d+)\/(?<databaseName>.+)$/;
  const match = connectionString.match(regex);

  if (!match) {
    throw new Error('Invalid connection string format');
  }

  const { groups } = match;
  console.log(groups);

  return {
    protocol: groups.protocol,
    username: groups.username,
    password: groups.password,
    host: groups.host,
    port: groups.port,
    databaseName: groups.databaseName
  };
}
