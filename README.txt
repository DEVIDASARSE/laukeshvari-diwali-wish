1) .env.local.example ko .env.local naam se copy karo, EmailJS ki 3 values bharo
2) npm install && npm run dev   (check karo)
3) Vercel pe deploy karo, wahan Settings > Environment Variables mein wahi 3 values daalo
EmailJS template variables: {{event}} {{answer}} {{wish}} {{memory}} {{date_idea}} {{message}} {{quiz}} {{sent_at}}

Note: NEXT_PUBLIC_* values browser bundle mein visible hoti hain. EmailJS service ID,
template ID aur public key ko secret na samjho; private credentials ko kabhi NEXT_PUBLIC_*
variables mein mat rakho. Example file mein sirf placeholders hain.
