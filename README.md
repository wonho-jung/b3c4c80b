## Screen shoot
The Data type was only answered, So I made fake data to show the UI what it looked like.

![Screenshot 2024-07-12 at 2 39 34 PM](https://github.com/user-attachments/assets/316b0d36-58b3-403c-93a1-0ef2bf39a782)
![Screenshot 2024-07-12 at 2 39 26 PM](https://github.com/user-attachments/assets/d333abd8-29b0-45ea-a50f-70b06dba02c3)
![Screenshot 2024-07-12 at 2 38 57 PM](https://github.com/user-attachments/assets/1147fb81-092b-4159-aa54-73604a1de470)

## Features
- inbox to show Activity Feed
- Accordion expand to show Activity Detail
- Archived calls
- Group action to archive or unarchive
- button to archive/unarchive each call

## Use
  - [TailwindCSS](https://tailwindcss.com/) for styling.
  - [MUI](https://mui.com/) for UI and icon.
  - Axios to fetch data
  - [unstated-next](https://aexol.com/posts/unstated-next-vs-redux-which-is-better-for-managing-state-in-react/) to small and simple state management


## Code architecture (outdated)
 - `src/components`: All the shared react components.
 - `src/containers`: State management container.
 - `src/utils`: All the functions & API.
   - `backend`: custom react hooks for fetching.

#Actual endpoint 
`/activities`:

`[
    {
        "direction": "inbound",
        "from": 1,
        "to": 2,
        "via": 1,
        "duration": 0,
        "is_archived": false,
        "call_type": "answered",
        "id": "6685a0df24a7a79ae0c50f8f",
        "created_at": "2024-07-03T19:05:03.506Z"
    },
    {
        "direction": "outbound",
        "from": 2,
        "to": 1,
        "via": 1,
        "duration": 0,
        "is_archived": false,
        "call_type": "answered",
        "id": "6685b79524326ad725d48041",
        "created_at": "2024-07-03T20:41:57.436Z"
    }
]`

`/activities/${id}`:

`{
    "direction": "inbound",
    "from": 1,
    "to": 2,
    "via": 1,
    "duration": 0,
    "is_archived": false,
    "call_type": "answered",
    "id": "6685a0df24a7a79ae0c50f8f",
    "created_at": "2024-07-03T19:05:03.506Z"
}`

## Deploying

## What I want to say

First of all, Thank you for giving me a chance. It was really fun to do the airball assignment.
The data was simple and the detailed endpoint was the same as getting calls. I was expected to have more info to display 😂

## Problem & solved
- The first time, the child component has too many states and functions. So, to make a reusable component, move on to the parent level and rebuild the card component as a reusable component.
- Fetch with Axios in each component to unnecessary or duplicate state such as loading, error... -> Made Fetch hook to reduce unnecessary state use case and save time to code😌.
