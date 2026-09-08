# DNS Walkthrough: How the Internet Finds My Portfolio

**Author:** Philip Omondi  
**Assignment:** Personal Website Live on the FlyRank Domain  
**Cohort:** FlyRank Internship 2026  
**Live Deliverable URL:** [https://philipomondi.netlify.app](https://philipomondi.netlify.app)  

---

## 1. What is DNS? (The Phonebook Analogy)

Computers on the internet don't communicate using names like `philipomondi.netlify.app` or `google.com`. They communicate using numeric **IP (Internet Protocol) addresses** (such as `75.2.60.5` for IPv4 or `2600:1f18:...` for IPv6), which act like the physical coordinates of a server in a global data center.

Humans, on the other hand, remember names, not long strings of numbers.

**DNS (Domain Name System)** is the internet’s decentralized phonebook. Just as you look up a person’s name in your phone to find their phone number and make a call, your web browser queries the DNS system to translate a human-readable domain name into the computer-readable IP address required to load the website.

---

## 2. The Four Key Players in Every DNS Lookup

When someone types `philipomondi.netlify.app` into their browser and presses Enter, a four-stage relay race begins behind the scenes:

1. **The Recursive Resolver (The Courier):**  
   Usually provided by your ISP (Internet Service Provider) or a public service like Cloudflare (`1.1.1.1`) or Google (`8.8.8.8`). Think of the resolver as a librarian or personal courier. Your browser asks it: *"Where is this website?"* The resolver then searches through the hierarchy on your behalf.
   
2. **The Root Nameserver (The Index):**  
   The resolver first contacts one of the global Root Nameservers. The root nameserver does not know the exact IP address, but it inspects the suffix of the domain (`.app` in `netlify.app`) and points the resolver to the correct Top-Level Domain (TLD) library.

3. **The TLD Nameserver (The Department Shelf):**  
   The `.app` registry nameserver receives the query. It still doesn't know my individual website, but it knows which authoritative nameserver is responsible for managing all domains ending in `netlify.app`.

4. **The Authoritative Nameserver (The Final Source of Truth):**  
   This is the final stop. Netlify’s authoritative nameservers hold the official DNS zone file for `netlify.app`. It looks up the record for `philipomondi`, retrieves the actual server destination, and hands the answer back to the resolver.

---

## 3. The Step-by-Step Query Journey

Here is the exact sequence that takes place in milliseconds:

```
[User Types URL] 
       │
       ▼
[Browser / OS Cache] ──(Not cached?)──► [Recursive Resolver]
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
     1. Root Nameserver              2. TLD Nameserver (.app)        3. Authoritative DNS (Netlify)
     ("Ask the .app TLD")            ("Ask Netlify's Nameservers")   ("Here is the IP / CNAME Target")
                                               │
                                               ▼
[Browser receives IP / Endpoint] ──► [TCP + TLS Handshake] ──► [Portfolio Renders]
```

1. **Cache Check:** The browser first checks its local cache and the operating system cache to see if it already looked up this address recently. If found, it connects immediately.
2. **Recursive Search:** If not cached, the resolver queries the Root server → then the `.app` TLD server → then Netlify’s Authoritative DNS server.
3. **Response & Caching:** The authoritative server returns the answer. The resolver caches this answer for the duration of the record's **TTL (Time to Live)** so future requests from nearby users are instantaneous.
4. **Connection:** With the destination in hand, the browser opens an HTTPS connection to Netlify’s edge node and downloads the HTML, CSS, and JavaScript.

---

## 4. What is a CNAME Record? (The Forwarding Alias)

In DNS, an **A Record** maps a domain directly to a static IP address (e.g. `example.com → 192.0.2.1`).

A **CNAME (Canonical Name) Record**, however, maps one domain name to another domain name instead of an IP address. Think of it as a mail-forwarding order at the post office.

### How it works on Netlify:
- If I later connect a custom domain like `portfolio.philipomondi.com`, I do not point it to a single static IP because Netlify uses a global **Content Delivery Network (CDN)** with hundreds of edge servers worldwide.
- Instead, I create a **CNAME record**:
  ```
  portfolio.philipomondi.com   CNAME   philipomondi.netlify.app.
  ```
- When a visitor visits `portfolio.philipomondi.com`, the DNS lookup sees the CNAME alias and follows it to `philipomondi.netlify.app`. Netlify’s dynamic load balancers then automatically route the visitor to the closest geographical edge server (e.g., in Nairobi or Frankfurt) for minimum latency and maximum reliability.

---

## 5. Automatic HTTPS: Why the Padlock Appears

Netlify provisions an **SSL/TLS certificate** (via Let’s Encrypt) automatically as soon as the site goes live. Once the DNS resolution verifies that the domain points to Netlify's infrastructure, an automated cryptographic handshake verifies domain control and issues a trusted certificate. This ensures that all traffic between visitors and the portfolio is encrypted over port 443 with modern TLS.

---

## 6. Summary

DNS turns a memorable brand name into an operational network route. By understanding recursive resolvers, nameserver hierarchies, CNAME aliasing, and edge routing, I understand how my portfolio is discovered, resolved, and securely delivered across the global internet.
