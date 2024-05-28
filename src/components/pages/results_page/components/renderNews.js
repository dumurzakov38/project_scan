import React, { useEffect, useState } from "react";
import { addSpacesToNumber } from "./addSpacesToNumber";

export function RenderNews() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const data = sessionStorage.getItem('news');

            if (data) {
                const newsArray = JSON.parse(data);
                setNews(newsArray);
            } else {
                setNews([]);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const decodeHtmlEntities = (str) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    };

    return (
        <div className="result__container__content--documentation--containerMain">
            {news.map((item, index) => {
                let category = "";
                let contentText = "";

                if (item.ok.attributes.isTechNews) {
                    category = "Технические новости";
                } else if (item.ok.attributes.isAnnouncement) {
                    category = "Анонсы и события";
                } else if (item.ok.attributes.isDigest) {
                    category = "Сводки новостей";
                }

                if (item.ok.content.markup.length > 1499) {
                    contentText = item.ok.content.markup.slice(0, item.ok.content.markup.indexOf(' ', 1500)) + '... прочтите полностью в источнике!';
                }

                const newsItem = { 
                    newsDate: item.ok.issueDate.slice(8,10) + "." + item.ok.issueDate.slice(5,7) + "." + item.ok.issueDate.slice(0,4),
                    newsSource: item.ok.source.name,
                    newsHeadline: item.ok.title.text,
                    categoryNews: category,
                    newsExcerpt: decodeHtmlEntities(contentText),
                    linkToNews: item.ok.url,
                    numberOfCharacters: item.ok.attributes.wordCount
                };

                return (
                    <div key={index} className="result__container__content--documentation--containerMain__article">
                        <div className="result__container__content--documentation--containerMain__article--content">
                            <div>
                                <div className="result__container__content--documentation--containerMain__article--content--containerPublicationDateAndAuthor">
                                    <h5 className="result__container__content--documentation--containerMain__article--content--containerPublicationDateAndAuthor--publicationDateH5">{newsItem.newsDate}</h5>
                                    <a href={newsItem.linkToNews} target="_blank" rel="noopener noreferrer">
                                        <h5 className="result__container__content--documentation--containerMain__article--content--containerPublicationDateAndAuthor--authorH5">{newsItem.newsSource}</h5>
                                    </a>
                                </div>
                                <div className="result__container__content--documentation--containerMain__article--content--containerTitle">
                                    <h1 className="result__container__content--documentation--containerMain__article--content--containerTitle__titleH1">{newsItem.newsHeadline}</h1>
                                </div>
                                <div className="result__container__content--documentation--containerMain__article--content--containerNewsCategory">
                                    {newsItem.categoryNews && (
                                        <h6 className="result__container__content--documentation--containerMain__article--content--containerNewsCategory__newsCategoryH6">{newsItem.categoryNews}</h6>
                                    )}
                                </div>
                                <div className="result__container__content--documentation--containerMain__article--content--containerContent">
                                    <div className="result__container__content--documentation--containerMain__article--content--containerContent--containerText">
                                        <div dangerouslySetInnerHTML={{ __html: newsItem.newsExcerpt }} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="result__container__content--documentation--containerMain__article--content--containerLinkToSource">
                                    <a href={newsItem.linkToNews} target="_blank" rel="noopener noreferrer">
                                        <button>Читать в источнике</button>
                                    </a>
                                </div>
                                <div className="result__container__content--documentation--containerMain__article--content--containerCharactersInTheArticle">
                                    <p>{addSpacesToNumber(newsItem.numberOfCharacters)} слова</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
