// SEO Optimization Script for NonstaticAI

document.addEventListener('DOMContentLoaded', function() {
    // Add structured data for reviews
    function addReviewStructuredData() {
        // Check if we're on a review page
        if (window.location.href.includes('/reviews/')) {
            // Get review data from the page
            const productName = document.querySelector('h1').innerText.replace(' Review', '');
            const ratingElement = document.querySelector('.rating-value-large');
            const rating = ratingElement ? parseFloat(ratingElement.innerText) : 4.5;
            const reviewBody = document.querySelector('.blog-content p') ? document.querySelector('.blog-content p').innerText : '';
            const authorName = document.querySelector('.author-name') ? document.querySelector('.author-name').innerText : 'NonstaticAI Team';
            const datePublished = document.querySelector('.post-date') ? document.querySelector('.post-date').innerText.replace('Published: ', '') : new Date().toISOString().split('T')[0];
            
            // Create the structured data
            const reviewStructuredData = {
                "@context": "https://schema.org/",
                "@type": "Review",
                "itemReviewed": {
                    "@type": "SoftwareApplication",
                    "name": productName,
                    "applicationCategory": "AIApplication"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": rating,
                    "bestRating": "5"
                },
                "name": productName + " Review",
                "author": {
                    "@type": "Person",
                    "name": authorName
                },
                "reviewBody": reviewBody,
                "datePublished": datePublished
            };
            
            // Add the structured data to the page
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(reviewStructuredData);
            document.head.appendChild(script);
        }
    }
    
    // Add structured data for blog posts
    function addBlogPostStructuredData() {
        // Check if we're on a blog post page
        if (window.location.href.includes('/blog/') && !window.location.href.endsWith('/blog/') && !window.location.href.endsWith('/blog/index.html')) {
            // Get blog post data from the page
            const articleTitle = document.querySelector('h1').innerText;
            const articleBody = document.querySelector('.blog-content p') ? document.querySelector('.blog-content p').innerText : '';
            const authorName = document.querySelector('.author-name') ? document.querySelector('.author-name').innerText : 'NonstaticAI Team';
            const datePublished = document.querySelector('.post-date') ? document.querySelector('.post-date').innerText.replace('<i class="far fa-calendar-alt"></i> ', '') : new Date().toISOString().split('T')[0];
            const featuredImage = document.querySelector('.blog-featured-image img') ? document.querySelector('.blog-featured-image img').src : '';
            
            // Create the structured data
            const blogPostStructuredData = {
                "@context": "https://schema.org/",
                "@type": "BlogPosting",
                "headline": articleTitle,
                "description": articleBody.substring(0, 150) + "...",
                "image": featuredImage,
                "author": {
                    "@type": "Person",
                    "name": authorName
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "NonstaticAI",
                    "logo": {
                        "@type": "ImageObject",
                        "url": window.location.origin + "/images/logo.png"
                    }
                },
                "datePublished": datePublished,
                "dateModified": datePublished,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": window.location.href
                }
            };
            
            // Add the structured data to the page
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(blogPostStructuredData);
            document.head.appendChild(script);
        }
    }
    
    // Add structured data for the organization
    function addOrganizationStructuredData() {
        const organizationStructuredData = {
            "@context": "https://schema.org/",
            "@type": "Organization",
            "name": "NonstaticAI",
            "url": window.location.origin,
            "logo": window.location.origin + "/images/logo.png",
            "sameAs": [
                "https://facebook.com/nonstaticai",
                "https://twitter.com/nonstaticai",
                "https://instagram.com/nonstaticai",
                "https://linkedin.com/company/nonstaticai"
            ]
        };
        
        // Add the structured data to the page
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(organizationStructuredData);
        document.head.appendChild(script);
    }
    
    // Add breadcrumb structured data
    function addBreadcrumbStructuredData() {
        const breadcrumbsElement = document.querySelector('.breadcrumbs');
        
        if (breadcrumbsElement) {
            const breadcrumbLinks = breadcrumbsElement.querySelectorAll('a');
            const breadcrumbItems = [];
            
            breadcrumbLinks.forEach((link, index) => {
                breadcrumbItems.push({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": link.innerText,
                    "item": link.href
                });
            });
            
            // Add the current page as the last item
            const currentPageText = breadcrumbsElement.querySelector('span') ? breadcrumbsElement.querySelector('span').innerText : document.title;
            
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": breadcrumbItems.length + 1,
                "name": currentPageText,
                "item": window.location.href
            });
            
            const breadcrumbStructuredData = {
                "@context": "https://schema.org/",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbItems
            };
            
            // Add the structured data to the page
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(breadcrumbStructuredData);
            document.head.appendChild(script);
        }
    }
    
    // Add canonical URL
    function addCanonicalUrl() {
        // Check if canonical URL already exists
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            canonicalLink.href = window.location.href.split('#')[0].split('?')[0];
            document.head.appendChild(canonicalLink);
        }
    }
    
    // Add meta description if not present
    function addMetaDescription() {
        // Check if meta description already exists
        if (!document.querySelector('meta[name="description"]')) {
            const metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            
            // Generate description based on page content
            let description = '';
            
            if (document.querySelector('h1')) {
                description = document.querySelector('h1').innerText + ' - ';
            }
            
            if (document.querySelector('p')) {
                description += document.querySelector('p').innerText.substring(0, 150) + '...';
            } else {
                description += 'Discover the best AI tools and software at NonstaticAI. Find reviews, comparisons, and recommendations for AI tools that can transform your workflow.';
            }
            
            metaDescription.content = description;
            document.head.appendChild(metaDescription);
        }
    }
    
    // Add Open Graph meta tags
    function addOpenGraphTags() {
        // Title
        if (!document.querySelector('meta[property="og:title"]')) {
            const ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            ogTitle.content = document.title;
            document.head.appendChild(ogTitle);
        }
        
        // Description
        if (!document.querySelector('meta[property="og:description"]')) {
            const metaDescription = document.querySelector('meta[name="description"]');
            const ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            ogDescription.content = metaDescription ? metaDescription.content : 'Discover the best AI tools and software at NonstaticAI.';
            document.head.appendChild(ogDescription);
        }
        
        // URL
        if (!document.querySelector('meta[property="og:url"]')) {
            const ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            ogUrl.content = window.location.href.split('#')[0].split('?')[0];
            document.head.appendChild(ogUrl);
        }
        
        // Type
        if (!document.querySelector('meta[property="og:type"]')) {
            const ogType = document.createElement('meta');
            ogType.setAttribute('property', 'og:type');
            
            if (window.location.href.includes('/blog/')) {
                ogType.content = 'article';
            } else {
                ogType.content = 'website';
            }
            
            document.head.appendChild(ogType);
        }
        
        // Image
        if (!document.querySelector('meta[property="og:image"]')) {
            const ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            
            // Try to find an image on the page
            let imageUrl = '';
            
            if (document.querySelector('.blog-featured-image img')) {
                imageUrl = document.querySelector('.blog-featured-image img').src;
            } else if (document.querySelector('.tool-image img')) {
                imageUrl = document.querySelector('.tool-image img').src;
            } else {
                imageUrl = window.location.origin + '/images/logo.png';
            }
            
            ogImage.content = imageUrl;
            document.head.appendChild(ogImage);
        }
    }
    
    // Add Twitter Card meta tags
    function addTwitterCardTags() {
        // Card type
        if (!document.querySelector('meta[name="twitter:card"]')) {
            const twitterCard = document.createElement('meta');
            twitterCard.name = 'twitter:card';
            twitterCard.content = 'summary_large_image';
            document.head.appendChild(twitterCard);
        }
        
        // Site
        if (!document.querySelector('meta[name="twitter:site"]')) {
            const twitterSite = document.createElement('meta');
            twitterSite.name = 'twitter:site';
            twitterSite.content = '@nonstaticai';
            document.head.appendChild(twitterSite);
        }
        
        // Title
        if (!document.querySelector('meta[name="twitter:title"]')) {
            const twitterTitle = document.createElement('meta');
            twitterTitle.name = 'twitter:title';
            twitterTitle.content = document.title;
            document.head.appendChild(twitterTitle);
        }
        
        // Description
        if (!document.querySelector('meta[name="twitter:description"]')) {
            const metaDescription = document.querySelector('meta[name="description"]');
            const twitterDescription = document.createElement('meta');
            twitterDescription.name = 'twitter:description';
            twitterDescription.content = metaDescription ? metaDescription.content : 'Discover the best AI tools and software at NonstaticAI.';
            document.head.appendChild(twitterDescription);
        }
        
        // Image
        if (!document.querySelector('meta[name="twitter:image"]')) {
            const twitterImage = document.createElement('meta');
            twitterImage.name = 'twitter:image';
            
            // Try to find an image on the page
            let imageUrl = '';
            
            if (document.querySelector('.blog-featured-image img')) {
                imageUrl = document.querySelector('.blog-featured-image img').src;
            } else if (document.querySelector('.tool-image img')) {
                imageUrl = document.querySelector('.tool-image img').src;
            } else {
                imageUrl = window.location.origin + '/images/logo.png';
            }
            
            twitterImage.content = imageUrl;
            document.head.appendChild(twitterImage);
        }
    }
    
    // Add schema.org structured data based on page type
    addReviewStructuredData();
    addBlogPostStructuredData();
    addOrganizationStructuredData();
    addBreadcrumbStructuredData();
    
    // Add basic SEO meta tags
    addCanonicalUrl();
    addMetaDescription();
    addOpenGraphTags();
    addTwitterCardTags();
});
