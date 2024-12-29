from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext

# Replace with your game URL
GAME_URL = "https://your-game-hosting.com"

def start(update: Update, context: CallbackContext) -> None:
    """Sends a Play Game button."""
    keyboard = [
        [InlineKeyboardButton("Play Game", url=GAME_URL)]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text("Welcome! Click below to play the game.", reply_markup=reply_markup)

def main() -> None:
    """Run the bot."""
    # Replace 'YOUR_BOT_TOKEN' with your bot token
    updater = Updater("YOUR_BOT_TOKEN")

    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler("start", start))

    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
