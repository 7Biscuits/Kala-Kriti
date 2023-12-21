const postData = async (): Promise<void> => {
  const mq2_val = Math.floor(Math.random() * (500 - 100 + 1)) + 100; // generate a random number b/w 100 and 500.
  let quality: string;

  if (mq2_val < 200) quality = "GOOD";
  else if (mq2_val >= 200 && mq2_val < 300) quality = "UNHEALTHY";
  else quality = "HAZARDOUS";
  await fetch(`http://localhost:8080/api/data/${mq2_val}/${quality}`, {
    method: "POST",
  }).then(() =>
    console.log("data posted", {
      mq2_val: mq2_val,
      quality: quality,
    })
  );
};

setInterval(postData, 3000);