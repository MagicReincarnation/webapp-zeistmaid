function htmlPreview(post){
  return `  
    <!DOCTYPE html>  
    <html>  
    <head>  
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview: ${post.title}</title>  
        <style>  
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                padding: 10px; 
                background: linear-gradient(135deg, #0a0a0a 0%, #001a0a 50%, #003d1a 100%);
                color: #e0e0e0;
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
            }
            
            @media (min-width: 768px) {
                body {
                    padding: 20px;
                }
            }
            
            .container { 
                max-width: 100%;
                width: 100%; 
                margin: 0; 
                background: rgba(10, 25, 15, 0.95);
                backdrop-filter: blur(10px);
                padding: 15px; 
                border-radius: 12px;
                border: 1px solid rgba(0, 255, 100, 0.3);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
                position: relative;
                overflow: hidden;
            }
            
            @media (min-width: 768px) {
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 25px;
                    border-radius: 16px;
                }
            }
            
            .meta { 
                background: linear-gradient(135deg, rgba(0, 255, 100, 0.1) 0%, rgba(0, 200, 83, 0.1) 100%);
                padding: 12px; 
                border-radius: 8px; 
                margin-bottom: 20px;
                border: 1px solid rgba(0, 255, 100, 0.2);
                font-size: 14px;
            }
            
            @media (min-width: 768px) {
                .meta {
                    padding: 16px;
                    border-radius: 10px;
                    font-size: 16px;
                }
            }
            
            .meta strong {
                color: #00ff64;
                font-weight: 600;
            }
            
            .meta-item {
                margin-bottom: 6px;
                padding: 3px 0;
                border-bottom: 1px solid rgba(0, 255, 100, 0.1);
            }
            
            @media (min-width: 768px) {
                .meta-item {
                    margin-bottom: 8px;
                    padding: 5px 0;
                }
            }
            
            .meta-item:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            
            .content { 
                line-height: 1.8;
                font-size: 16px;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            }
            
            .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
                color: #7877c6;
                margin: 20px 0 15px 0;
                text-shadow: 0 0 15px rgba(120, 119, 198, 0.4);
                font-weight: 600;
            }
            
            .content p {
                margin-bottom: 16px;
                color: #d0d0d0;
            }
            
            .content a {
                color: #ff77c6;
                text-decoration: none;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .content a:hover {
                color: #78dbe2;
                text-shadow: 0 0 10px rgba(120, 219, 226, 0.5);
            }
            
            .content a::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(90deg, #ff77c6, #78dbe2);
                transition: width 0.3s ease;
            }
            
            .content a:hover::after {
                width: 100%;
            }
            
            img { 
                max-width: 100%; 
                height: auto;
            }
            
            .anime-accent {
                position: fixed;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%);
                animation: float 6s ease-in-out infinite;
                pointer-events: none;
                z-index: -1;
            }
            
            .anime-accent:nth-child(1) {
                top: 10%;
                left: 10%;
                animation-delay: 0s;
            }
            
            .anime-accent:nth-child(2) {
                top: 60%;
                right: 10%;
                animation-delay: 2s;
                background: radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%);
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                }
                33% {
                    transform: translateY(-20px) rotate(120deg);
                }
                66% {
                    transform: translateY(10px) rotate(240deg);
                }
            }
            
            ::-webkit-scrollbar {
                width: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: rgba(20, 25, 40, 0.5);
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
                background: linear-gradient(45deg, #7877c6, #ff77c6);
                border-radius: 10px;
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(45deg, #ff77c6, #78dbe2);
            }
        </style>  
    </head>  
    <body>  
        <div class="anime-accent"></div>
        <div class="anime-accent"></div>
        
        <div class="container">  
            <div class="meta">  
                <div class="meta-item">
                    <strong>Type:</strong> ${post.type}
                </div>
                <div class="meta-item">
                    <strong>Categories:</strong> ${post.categories.join(', ')}
                </div>
                <div class="meta-item">
                    <strong>Publish Date:</strong> ${new Date(post.publishDate).toLocaleString()}
                </div>
            </div>  
            <div class="content">  
                ${post.content}  
            </div>  
        </div>  
    </body>  
    </html>  
  `;
}