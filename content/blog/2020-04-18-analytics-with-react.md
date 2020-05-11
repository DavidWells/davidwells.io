---
title: "Analytics with React"
descriptions: "Instrumenting analytics in react applications can be challenging, but luckily, it doesn't have do be"
author: DavidWells
date: 2020-04-18 09:30:00
layout: post
category: dev
---

Instrumenting analytics in react applications can be challenging, but luckily, it doesn't have do be.

Using the [`use-analytics` package](https://www.npmjs.com/package/use-analytics), its easy to wire up telemetry in your app.

<iframe width="768" height="432" src="https://www.youtube.com/embed/C_1ced3l9cU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

## Transcript

**David Wells (0:00)**  

Today, I'm going to show a quick demo of using analytics and using analytics hooks with react router version 6. React router is in preview right now it should be released sometime soon. But this method actually works with any type of router. As well as the analytics library. It really works with any JavaScript library. It's not dependent on react. What I'm going to be showing today though, is the use analytics hooks that is specific for react, which makes it a little bit nicer to work with analytics when you are using react.

Before we jump into it. I just want to give a quick shout out to Lee Halladay for the awesome tutorial on react router v six. That's actually the base app that I'm going to be using today. It's a simple little shoe store with some nested components and what have you. But let's go ahead and jump into the app. So here we have our shoe store. There's a bunch of different routes with you know, a shoe that I can buy and that's really As simple as it gets nothing too fancy here. Let's jump into the code and actually see what this looks like. So inside of my app here, I'm using the browser router importing my react app. And then inside of the app js file, I am using my routes to, you know, do everything with react router basics. And then I have one effect here that's listening to the location to actually send pageviews. And we're going to implement that on this video. And we're also going to implement some custom tracking on the handle purchase. And just walk through in general the different kind of pieces of the use analytics library and the different higher order components and what have you. But without further ado, let's jump over to our terminal and actually get the packages that we need installed here. So inside of my example app here, I'm going to yarn add Add analytics. And I'm going to add the EWS dash analytics package, you can obviously npm install this as well. I'm just using yarn here in this video. So once those get installed, great, we are ready to actually add analytics to our application. So let's go ahead and do that. So in our we'll add it to the index j s, and we'll refactor this as we go. But so inside of app dot j s, we want to import the analytics package from analytics. Before we actually initialize an analytics instance, I'm just going to do a quick aside. So the analytics library, what it is, is basically an abstraction over different analytics tools or your own analytics tools. This is the like a super bare bones implementation here where, hey, I'm just importing analytics. I'm initializing it with We're gonna do in a second in our app. And then every time analytics dot track is called that callback, this handlers fired. So I can send that again to like Google Analytics, or amplitude, or HubSpot, or my own back end. Similarly, with pageviews, I can send that page you did that to my own serverless functions for processing, or into Google Analytics or what have you. So really, at its core analytics is an abstraction layer. But it lets you actually, you know, send data to multiple places, as well as allow users to opt out of analytics and all kinds of other stuff. So let's actually initialize this in our application. So I'm going to do const analytics equals, and this ships with full TypeScript types. So we can actually get autocomplete here of like, Alright, I need an app name and then the any plugins that I want to attach, so I'm going to call this awesome

**David Wells (4:02)**  

And then the plugins that I'm going to install will install a real plugin in a little bit. But just for right now I'm gonna just create a page tracking inline plugin here, console dot log page, you fired. And then we're also going to add a tracking handler. So track, this is also just a function that I can send data with. So if you want to see what the entire like data that is passed into these, you can console that log that out. All right, the other thing that we plugins need is a name. So I'm just going to call this my custom plugin for it. Now, we'll take a look at installing Google Analytics in a little bit here. Alright, so the analytics is initiated. And that means our entire Analytics API is now available for us to use. If we pop back over into our application, we can see if we console that log analytics, the analytics instance, we can see the entire API available to us to us, which includes identify page and track, the entire API references is documented on the doc site. So if you're curious, go check that out. Yeah, we have our custom kind of plugin here that we're going to be using. And that's really one of the beauties of using analytics, you can actually implement the entire kind of tracking stuff in your application, without wiring it up to a real analytics provider. You can actually just do that after the fact by installing just another plugin, and just like inlining it into the plugins array. So that's it. Similarly, if you wanted to remove something like Google Analytics from your app, you can just remove that one line in the plugins array, and you're off to the races. So that's why I really like kind of this layer, I build my applications, build all the kind of tracking mechanisms inside of my components. And I don't need to worry about where that data is going to be sent until, you know, the business folks decide what tool they're going to use, etc. but cool. So with analytics, now we have this instance, inside of our application, we could actually import this analytics instance around into various components. So for example, inside of the, the shoe page, I could import analytics from, you know, I might put this in a utils file from utils analytics, and I can use you know, dot page track, etc off of this. But, you know, using relative paths is kind of tricky, especially if you refactor your application. A bunch So that's really what the use analytics hook is for. So we can use the analytics instance wherever we want inside of our react tree. So we're going to go ahead and initialize that in our top level of our application. So going into the React hook stocks, let's take a look at how to use. So what we want to do is actually import the analytics provider from our package. So at the very top here, we're going to import analytics provider. We're not going to use the use analytics hook here. And then we want to wrap our component in the analytics provider. So I'm going to go ahead and do this.

**David Wells (7:50)**  

Keep the browser inside.

**David Wells (7:54)**  

I don't think the nesting layer really matters here and then you do need to pass it the analytics instance. So I'm just going to say instance equals, and that's analytics, because that's what we have initialized here. Again, typically, I will pull this out into a utils file. So it's not kind of in the main index js file, just so it's a little bit cleaner. But yeah, so now, when we save this, and go back to our application, there will be a new context on the page. And if we go into one of those nested components, I'm going to go ahead and do a little more copying, pasting. If we go into let's say, the shoe page. And I want to use analytics here, instead of importing the direct path analytics, my analytics instance, I can just import use analytics and use the use analytics hook. So when we do that, what we can do is say, All right, we're going to, we're going to pull off the track and we're going to use analytics Very cool. And inside of here, so we have a handle purchase function. So if I go ahead and go into our shoe, and if I click Buy a, there we go, we're purchasing this shoe, I need a bunch more Jordans for my collection. Awesome. So I'm just console logging that out. Now, what I can do now is because we have that analytics instance for at the ready, we can actually record a shoe purchase event. And then I can also add, you know, additional metadata with this. So let's say price equals and we'll do shoe dot price. And we'll do what else is on the shoe, the name of the shoe

**David Wells (9:45)**  


name. So we'll do shoe name as well.

**David Wells (9:50)**  

Cool. All right. So our tracking event is now wired up. And again, this tracking event maps down to analytics track so if you're importing this to It'd be analytics track, because we're using using analytics. It's it's just pulling it. I'm D, structuring it off of that instance here. And the docs for the tracking event is is right here. So there's a bunch of different examples. But yeah, it's really like what's the event name and then any additional payload with it. So let's go ahead and save this. And if we go into our application, now, when I click on buy shoe, we should see the tracking event that we have in our custom plugin firing as well. So there we go. So the console dot log is happening from our function here. I'm going to get rid of this. And we'll go ahead and click this again. So we can see here is the tracking event is fired with the event of shoe purchased and then the properties here of the name of the shoe and the price of the shoe. So if I was, you know linting this to send to my back end, I would come into the tracking now and say, all right, so let's use the fetch API to call out to, you know, my, my endpoint, API, blah, blah, blah. And then I would just map in like event name, and the payload here, and then inside of my service function, or whatever I would, I would send those in. So so the tracking function that you implement here as a, an actual like, analytics plugin, that's a generic one that passes that data into your given API. So that looks good to me. Let's actually implement page views as well. So inside of app dot j s, what we have is we're using one effect here, and that changes every time the page location changes. This is a react router v six feature that you can use location and get information off of that. But every time that changes, it's effectively pageview in our application. So what I can do here is, what we want to do is import, use analytics, again,

**David Wells (12:14)**  

the hook from

**David Wells (12:18)**  

us analytics. And let's go ahead and I'm just going to use the full one right here. So go ahead and use analytics and spell the straight. And now inside of here, what I can do is say, dot page, analytics page. Again, I could be structure page off here, but let's just do it this way. I'm going to go ahead and console, get rid of that console. And now every time the location changes, we're actually going to send a page view. So let's go ahead and try that out. Let me refresh and we can see Initially, when the page loaded, it is calling our function. And if I go to back to the all shoes page, again, another page has been fired, and other page views and fired when I go home. Additionally, if I go into the individual shoes, so we can see that our page view is firing. And the properties of that are the route and the refer and a bunch of other information about the page. That is the information that we would take, again, in our custom plugin, or you know, the Google Analytics or HubSpot, or whatever provider you're using automatically does this. But we would do, you know, again, our API call to persist that page view data again, and we could allow users to opt out and like not even attached to this plugin if they have opted out. There actually is a number of ways to do that in analytics. There's actually a do not track plugin that will Respect users settings. So they have that if you install this plugin and attach it to the plugins array, any page view, track or identify, identify call, etc, just will no op, so it won't even send any of the other plugins that you might have installed. let's actually go ahead and install Google Analytics. And I'll show you how that works. So let's say you know, we have our application set up, we're doing page view tracking, we are submitting custom event data. And we want to actually send that to Google Analytics. So what I can do is again, I'm going to start my application. I'm going to do yarn add, and it is at Google Analytics. So the app analytics namespace is the so this will install Google Analytics once Google Analytics is installed. What we can do is in our application Go back into where we have initialized analytics. And we'll go ahead and add this in here. So we'll say import Google Analytics from the Google Analytics package. And to actually use this, all we need to do is add a comma here, because that's a another plugin, we can initialize the Google Analytics plugin. And this is also typed as well, we have a tracking ID that we need to initialize. And this formatting is messing me up.

**David Wells (15:38)**  

Here we go.

**David Wells (15:42)**  

Yeah, so this is my inline plugin. And

**David Wells (15:47)**  

I would actually do something like this const plugin, clean this up a little bit.

**David Wells (15:54)**  

And we can just do this with a one liner.

**David Wells (15:58)**  

Cool. So Now we have Google Analytics installed. And we have my custom plugin installed. As you can see, plugins are just a plain old JavaScript object. That's actually if you go look at the source code of any of the provider plugins, it's, they're all implemented the exact same way. The next step obviously, would be like to plug in a real Google Analytics ID here. This one's a fake one just for the demo. But if we go back in here, and start our application on start, so if I go into like, let's navigate around, if I look at the network's tab, I'm going to clear this out. I can click around in my application, and we can see that this is the Google Analytics page view event firing it's sending to a fake account right now because that tracking ID is wrong, but it is triggering those events, as well as if I if I clear this out and click Buy the shoe. Hey, there's my custom tracking event with the price sending into to Google Analytics. So that is really kind of use analytics in a nutshell, there is a lot more that you can do with analytics. And there are a number of different things with the use analytics package as well. So there, there's a way to actually use analytics inside of classes, there's a way to use it inside of functional components. There's also a higher order component with analytics if you are using class components as well. So there's a number of different ways to use this with react. I hope this makes it a little bit easier to consume. The the really the main benefit here again, is by having the single attraction layer for your your app telemetry, you can do a lot of stuff and add and remove. So let's say business requirements change and we don't want And GDPR says no more Google Analytics, we can simply just remove Google Analytics and remove the dependency from our project. And we don't have to go through our entire code base and remove those tracking calls. That just got rid of it for us completely. And that's kind of the beauty of using something like this. If you want to see any of the source code of this demo, this is the repo use analytics with react router demo on GitHub. Go ahead and feel free to fork that, clone it down, do whatever you want with it. And if you have any questions on using analytics, or using analytics with react or view or whatever, because again, it works with any framework, including inside of new j s and in React Native.

Feel free to tweet at me at David Wells on Twitter happy to answer any questions people have. As always, thanks for watching and have a good one.