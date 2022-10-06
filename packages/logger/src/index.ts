//TODO: the firt time turbo runs, the express server crashes due to not finding the "main" path, that's only created after a first run. Find a fix
export const log = (str: any) => {
  console.log("logger: " + str);
};
