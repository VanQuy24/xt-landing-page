# Sitemap

Decided in the grilling session of 2026-10-11. The site exists to get a brief sent. Four pages plus a 404, in English and Vietnamese.

## Pages

| Page             | English URL         | Vietnamese URL         | Why it earns its place                                                                                                                                                                  | Content                          |
| ---------------- | ------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Home             | `/`                 | `/vi/`                 | The one page that sells. It holds everything a buyer needs before sending a brief: services, products, clients, process, FAQ and the form.                                              | `en/home.md`, `vi/home.md`       |
| Careers          | `/careers`          | `/vi/careers`          | A second goal, hiring. The live site has five real perks and the seven values, and candidates are a different reader from buyers, so they get their own page instead of a Home section. | `en/careers.md`, `vi/careers.md` |
| Privacy policy   | `/privacy-policy`   | `/vi/privacy-policy`   | The form collects names and emails, so a privacy policy is required. The live text exists.                                                                                              | `en/privacy.md`, `vi/privacy.md` |
| Terms of service | `/terms-of-service` | `/vi/terms-of-service` | Linked from the footer. The live text exists and costs nothing to keep.                                                                                                                 | `en/terms.md`, `vi/terms.md`     |
| 404              | any unknown URL     | any unknown `/vi/` URL | Catches old links and typos.                                                                                                                                                            | `en/404.md`, `vi/404.md`         |

## Navigation

Header, on every page:

- Logo, links to Home
- Services · Products · Clients · Process · News · FAQ: jump to Home sections 3, 4, 5, 7, 9a and 10. From Careers or the legal pages they go to Home first.
- Careers
- Language switch: EN / VI, to the same page in the other language
- Button: Get in touch, to Home section 11 (Send a brief)

Footer, on every page:

- Contact: both phones, email
- Offices: Plano, Texas · Ho Chi Minh City
- Links: Careers · Privacy policy · Terms of service
- Social: Facebook, LinkedIn
- Legal line: © 2026 XIONTECH JOINT STOCK COMPANY · Business license 0318883639 · D-U-N-S 665533815

## Merged into Home

| Live page  | Where its content went                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| About us   | "Why choose us" (section 8) and the name line in "Who we are" (section 9). The values went to Careers. The fake team and testimonials are cut. |
| Contact us | "Send a brief" (section 11): form, phones, WhatsApp, email, addresses.                                                                         |
| FAQs       | Four of the ten questions, in section 10.                                                                                                      |
| Support    | Office hours and reply time in section 11. License number and D-U-N-S in the footer.                                                           |

## Cut

| What                   | Why                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Blog                   | All posts are theme demo text dated 13 Feb 2023. No real posts exist.                                        |
| Case studies page      | It never existed. The links point to the Webteck theme demo.                                                 |
| Cookie policy page     | Cookies are a section of the privacy policy already.                                                         |
| Job detail pages       | No open roles. Add when a role opens.                                                                        |
| Mountain theme wording | It came from the earlier draft, not the live site. Only one line about the name survives, in Home section 9. |

## URLs that must keep working

The privacy policy says it covers XionTech's web, desktop and mobile apps, and points readers to app store listings. Those listings and in-app screens often link the live privacy and support URLs directly, so:

- Privacy and Terms keep their live slugs, `/privacy-policy` and `/terms-of-service`.
- `/support/` must redirect to Home section 11. This is required, not optional.
- `/about-us/`, `/contact-us/`, `/faqs/` and `/faq/` should redirect to Home, or they hit the 404.
- [DUMMY: confirm which app store listings or apps link these URLs]

## Languages

English is the default with no URL prefix. Vietnamese lives under `/vi/`. The live site has no Vietnamese version, so the Vietnamese copy is a new translation:

- `vi/home.md`, `vi/careers.md`, `vi/404.md`: translated, marked `[VI-REVIEW]` for a native speaker to check.
- `vi/privacy.md`, `vi/terms.md`: not translated. Legal text needs a professional translation.

## Gaps to fill before launch

Search the content files for `[DUMMY:` to find each one. The current list:

- Which apps link the privacy and support URLs, in this file
- Headcount stat in Home 2
- What Buddy360 does, and one real photo in Home 4
- Varkey Education's OK to describe their apps in general terms in Home 5
- One general line on the work for CyberHive in Home 5
- Two client quotes, or remove the section in Home 6
- The inbox and service the form sends to in Home 11
- The CV inbox in Careers 2
- Meta descriptions for the legal pages
- Vietnamese legal text
- The registered Vietnamese company name in the Vietnamese footer

Search for `[UPDATE:` to find facts that will change, such as the HCMC office move and the office count.
