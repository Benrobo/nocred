export async function sleep(time = 1) {
  return new Promise(function (res) {
    setTimeout(res(), time * 1000);
  });
}
