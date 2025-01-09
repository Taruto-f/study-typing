/** @type {import('next-sitemap').IConfig} */
const config={
	siteUrl:"https://study-typing.vercel.app",
	generateIndexSitemap:false,
	generateRobotsTxt:true,
	exclude:["/play","/share","/data","/icon.svg"]

}
module.exports=config;
