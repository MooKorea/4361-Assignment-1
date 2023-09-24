export default async function sleep(milliseconds) {
  await new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};
