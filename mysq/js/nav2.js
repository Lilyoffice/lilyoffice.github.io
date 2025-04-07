function createNavigation() {
    const navDiv = document.createElement('div');
    navDiv.className = 'bg-gray-100 p-4 md:w-1/4 overflow-y-auto';

    const navTitle = document.createElement('h4');
    navTitle.className = 'text-xl font-bold mb-4';
    navTitle.textContent = '目录导航';

    const navList = document.createElement('ul');
    navList.className = 'space-y-2';

    const links = [
        { text: '活动排期预览', href: `https://lilyoffice.github.io/mysq/mainhtml/activity.html?uid=${uid}` },
        { text: '梦魅养成攻略', href: `https://lilyoffice.github.io/mysq/mainhtml/activity.html?uid=${uid}` },
        { text: '新人养成攻略', href: `https://lilyoffice.github.io/mysq/mainhtml/activity.html?uid=${uid}` }
    ];
    links.forEach(({ text, href }) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = href;
        link.className = 'text-blue-600 hover:underline';
        link.textContent = text;
        listItem.appendChild(link);
        navList.appendChild(listItem);
    });

    navDiv.appendChild(navTitle);
    navDiv.appendChild(navList);

    return navDiv;
}

// 页面加载完成后自动创建导航栏
document.addEventListener('DOMContentLoaded', () => {
    const nav = createNavigation();
    document.body.prepend(nav);
});
