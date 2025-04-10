document.addEventListener('DOMContentLoaded', function() {
    const block = document.getElementById('draggable');
    const container = document.querySelector('.container');
    
    let isDragging = false;
    let offsetX, offsetY;
    
    block.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - block.getBoundingClientRect().left;
        offsetY = e.clientY - block.getBoundingClientRect().top;
        block.style.opacity = '0.5';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // 计算新位置
        let newLeft = e.clientX - offsetX - container.getBoundingClientRect().left;
        let newTop = e.clientY - offsetY - container.getBoundingClientRect().top;
        
        // 限制在容器内
        newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - block.clientWidth));
        newTop = Math.max(0, Math.min(newTop, container.clientHeight - block.clientHeight));
        
        // 设置新位置
        block.style.left = newLeft + 'px';
        block.style.top = newTop + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            block.style.opacity = '1';
        }
    });
    
    document.addEventListener('mouseleave', function() {
        if (isDragging) {
            isDragging = false;
            block.style.opacity = '1';
        }
    });
});