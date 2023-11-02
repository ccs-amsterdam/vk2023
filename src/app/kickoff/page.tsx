import { load } from "outstatic/server";
import markdownToHtml from "@/lib/markdownToHtml";
import PersonItem from "@/components/PersonItem";

const markdown = `
# Join our Kick-off event!

We are excited to announce the Kick-off meeting for the Societal Analytics Lab. 
The meeting will take place on **Thursday, November 9th** at **4pm**, in the **Senaatszaal, HG2E31**.

## Get To Know Us!
The newly established Societal Analytics Lab aims to be the faculty’s first point of contact for those interested in applying computational techniques in their research on societal issues. We want to foster research that fits the digital society that we live in, specifically targeting two groups of scholars:

* 1️⃣ **Those New to the Matter**: If you're curious about how computational methods can benefit your research, we offer guidance, training, and essential tools to boost your analytical career. Adding **innovative computational elements to grants can often make them more competitive**, and we’re happy to help you design, write, and execute research proposals. 

* 2️⃣ **Those Already in the Know**: If you're already familiar with computational methods but lack resources, **we provide the necessary tools and infrastructure** to facilitate your research project.


## Why Attend the Kick-Off?

* 🎉 **A Glimpse into Computational Social Science**: Lab directors Wouter van Atteveldt and Kasper Welbers will provide an engaging introduction into the fascinating opportunities that computational methods can bring to social sciences.

* 🌐 **Learn About Us**: We will outline what the lab aims to achieve and what projects are in the pipeline.

* 🗨️ **Have Your Say**: We'd love to hear what you’d like to see in the lab and how we can help you achieve your research goals!



Plus, we’ll have free food and drinks - something even our website cannot offer!

We hope to see you there!

Wouter van Atteveldt, Kasper Welbers, and Sarah Sramota
`;

export default async function Index() {
  const { content, people } = await getData();
  return (
    <div className="animate-fade-in flex flex-col lg:flex-row max-w-[1200px] mx-auto px-4 md:px-8">
      <div
        className="flex-auto relative w-full max-w-2xl mx-auto lg:mx-0 prose md:prose-xl mt-4 lg:mt-8 overflow-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="relative flex px-4 ml-auto w-full lg:w-1/3 mt-12 lg:mt-8">
        <div className="flex flex-col mx-auto items-center gap-8 flex-auto">
          <h2 className="text-center text-2xl font-bold">
            The Societal Analytics Lab Team
          </h2>
          {people.map((person) => {
            return <PersonItem key={person.name} person={person} />;
          })}
        </div>
      </div>
    </div>
  );
}

async function getData() {
  const db = await load();

  const content = await markdownToHtml(markdown);

  const allPeople = await db
    .find({ collection: "people" }, ["title", "content", "coverImage"])
    .sort({ publishedAt: 1 })
    .toArray();

  const people = allPeople.map((person) => {
    return {
      name: person.title,
      avatar: person.coverImage || "",
      function: person.content,
    };
  });

  return { content, people };
}
