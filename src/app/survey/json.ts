export const json = {
  "showPreviewBeforeComplete": "showAnsweredQuestions",
  "elements": [
    {
      "type": "panel",
      "name": "nps-panel",
      "elements": [
        {
          "type": "rating",
          "name": "nps-score",
          "title": "On a scale from 0 to 10, how likely are you to recommend us to a friend or colleague?",
          "rateMin": 0,
          "rateMax": 10,
          "minRateDescription": "Very unlikely",
          "maxRateDescription": "Very likely"
        },
        {
          "type": "comment",
          "name": "disappointing-experience",
          "visibleIf": "{nps-score} <= 5",
          "title": "How did we disappoint you and what can we do to make things right?",
          "maxLength": 300
        },
        {
          "type": "comment",
          "name": "improvements-required",
          "visibleIf": "{nps-score} >= 6",
          "title": "What can we do to make your experience more satisfying?",
          "maxLength": 300
        },
        {
          "type": "checkbox",
          "name": "promoter-features",
          "visibleIf": "{nps-score} >= 9",
          "title": "Which of the following features do you value the most?",
          "description": "Please select no more than three features.",
          "isRequired": true,
          "choices": [
            { "value": "performance", "text": "Performance" },
            { "value": "stability", "text": "Stability" },
            { "value": "ui", "text": "User interface" },
            { "value": "complete-functionality", "text": "Complete functionality" },
            { "value": "learning-materials", "text": "Learning materials (documentation, demos, code examples)" },
            { "value": "support", "text": "Quality support" }
          ],
          "showOtherItem": true,
          "otherPlaceholder": "Please specify...",
          "otherText": "Other features",
          "colCount": 2,
          "maxSelectedChoices": 3
        }
      ]
    },
    {
      "type": "boolean",
      "name": "rebuy",
      "title": "Would you buy our product again?"
    },
    {
      "type": "panel",
      "name": "testimonial-request",
      "elements": [
        {
          "type": "radiogroup",
          "name": "testimonial",
          "title": "Would you mind providing us a brief testimonial for the website?",
          "choices": [
            { "value": "yes", "text": "Sure!" },
            { "value": "no", "text": "No" }
          ]
        },
        {
          "type": "text",
          "name": "email",
          "visibleIf": "{testimonial} = 'yes'",
          "title": "What is your email address?",
          "validators": [
            { "type": "email" }
          ],
          "placeholder": "Enter your email here"
        }
      ]
    }
  ],
  "showQuestionNumbers": false,
  "questionsOnPageMode": "questionPerPage"
};