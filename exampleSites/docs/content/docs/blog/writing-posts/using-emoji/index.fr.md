---
title: Utilisation d'Emoji
date: '2020-06-08T06:15:25+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Utilisation d'Emoji
weight: 60
aliases:
  - /posts/writing-posts/using-emoji/
  - /docs/writing-posts/using-emoji/
---

Emoji peut être activé dans un projet Hugo de plusieurs façons.
<!--more-->
La fonction [`emojify`](https://gohugo.io/functions/emojify/) peut être appelée directement dans les templates ou par [shortcodes en ligne](https://gohugo.io/templates/shortcode-templates/#inline-shortcodes).

Pour activer globallement Emoji, paramètrez `enableEmoji` à `true` dans la [configuration](https://gohugo.io/getting-started/configuration/) de votre site et vous pouvez ensuite taper des codes raccourcis d'Emoji directement dans les contenus de vos fichiers; par exemple:

🙈 `:see_no_evil:`  🙉 `:hear_no_evil:`  🙊 `:speak_no_evil:`



L'[aide mémoire Emoji](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) est une référence utile pour les codes emoji.

***

**N.B.** Les étapes ci-dessus active les caractères Unicode Standard Emoji dans Hugo, cepandant, le rendu de ces glyphes dépend du navigateur et de la plateforme. Pour styler l'emoji vous pouvez utiliser une police emoji tierce ou un empilement de polices; par exemple:

{{< highlight html >}}
.emoji {
font-family: Apple Color Emoji,Segoe UI Emoji,NotoColorEmoji,Segoe UI Symbol,Android Emoji,EmojiSymbols;
}
{{< /highlight >}}
