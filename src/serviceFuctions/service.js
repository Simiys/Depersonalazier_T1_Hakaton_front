export function parseConnectionString(connectionString) {
  const regex =
    /^(?<protocol>[^:]+):\/\/(?<username>[^:]+):(?<password>[^@]+)@(?<host>[^:]+):(?<port>\d+)\/(?<databaseName>.+)$/;
  const match = connectionString.match(regex);

  if (!match) {
    throw new Error('Invalid connection string format');
  }

  const { groups } = match;

  return {
    protocol: groups.protocol,
    username: groups.username,
    password: groups.password,
    host: groups.host,
    port: groups.port,
    databaseName: groups.databaseName
  };
}
