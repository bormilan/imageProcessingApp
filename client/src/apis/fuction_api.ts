var backend = process.env.REACT_APP_BACKEND;

export async function ProcessImage(route: string, bodyFormData: FormData) {
  const res = await fetch(`${backend}/${route}`, {
    method: "POST",
    body: bodyFormData,
  });

  return res;
}
