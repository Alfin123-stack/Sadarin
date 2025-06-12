export const sendToBot = async (message, intent = null) => {
  try {
    const response = await fetch(
      "https://sadarinbot-bubvc3hbcka0dhe6.indonesiacentral-01.azurewebsites.net//api/message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, intent }),
      }
    );

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("❌ Error sending to bot:", error.message);
    return "Gagal menghubungi bot.";
  }
};
