import React, { Component } from "react";

function About() {
  return (
    <div className="container p-4 my-5">
      <h1 className="display-4 text-center">About</h1>
      <p>I will be evolving this over next few days using this guide</p>
      <p><a href="https://www.shopify.com/blog/how-to-write-an-about-us-page">About Page Guide</a></p>
      <dl>
        <dt>Set the scene:</dt>
        <dd>- Introduce the characters or setting, and establish the status quo or “the way things were” for you, your target customer, or your industry.</dd>
        <dt>Introduce the problem:</dt>
        <dd>- Describe the problem that called you (the main character) to act.</dd>
        <dt>Rise to the challenge:</dt>
        <dd>- Explain how you set out to find a solution (i.e. start your business) and the obstacles you faced along the way.</dd>
        <dt>Arrive at a solution:</dt>
        <dd>- Share details of how your business is pursuing its purpose and the milestones you’ve hit.</dd>
        <dt>Envision what’s next:</dt>
        <dd>- Paint a picture of the future for your company or state its mission and goals.</dd>
      </dl>     
    </div>
  )
}

export default About;