// Model data - Page 1
const page1Models = [
    {
        name: "MobileNetV2",
        description: "MobileNetV2是对MobileNetV1的改进，是一种轻量级的神经网络。MobileNetV2保留了V1版本的深度可分离卷积，增加了线性瓶颈（Linear Bottleneck）和倒残差（Inverted Residual）。",
        tags: ["分类"],
        date: "2026-03-24 16:23:20",
        badge: null
    },
    {
        name: "Vit-B-16",
        description: "Transformer 架构已广泛应用于自然语言处理领域。Vision Transformer（ViT）模型在计算机视觉领域中对CNN的依赖不是必需的，直接将其应用于图像块序列来进行图像分类时，也能得到和目前卷积网络相媲美的准确率。",
        tags: ["分类"],
        date: "2026-03-17 17:45:49",
        badge: "Beta"
    },
    {
        name: "SuperPoint",
        description: "SuperPoint模型的全卷积神经网络架构对全尺寸图像进行操作，并在单次前向传递中产生伴随固定长度描述符的兴趣点检测。该模型有一个单一的共享编码器来处理和减少输入图像的维数。在编码器之后，该架构分成两个解码器头，它们学习任务特定权重——一个用于兴趣点检测，另一个用于感兴趣点描述。大多数网络参数在两个任务之间共享，这与传统系统不同，传统系统首先检测兴趣点，然后计算描述符，并且缺乏跨两个任务共享计算和表示的能力。",
        tags: ["特征点检测"],
        date: "2026-03-16 21:11:02",
        badge: null
    },
    {
        name: "DenseNet121",
        description: "DenseNet 针对 ResNet 的冗余结构提出了改进：让网络中的每一层和前面的所有层相连，同时把每一层设计的比较窄，使每一层学到的特征变少从而降低冗余。除了减少参数量之外，该结构还有减轻梯度消失问题、增强特征传播等优点。",
        tags: ["分类"],
        date: "2026-03-16 20:23:49",
        badge: null
    },
    {
        name: "ShuffleNetV2",
        description: "ShuffleNetV2是Shufflenet的升级版本，作为轻量级网络，通过遵循降低网络的碎片程度、减少element-wise等设计准则，在保证精度的前提下进一步追求高性能。",
        tags: ["分类"],
        date: "2026-03-16 20:19:07",
        badge: null
    },
    {
        name: "SqueezeNet1_1",
        description: "Squeezenet的设计采用了卷积替换、减少卷积通道数和降采样操作后置等策略，旨在在不大幅降低模型精度的前提下，最大程度的提高运算速度。",
        tags: ["分类"],
        date: "2026-03-16 19:24:13",
        badge: null
    },
    {
        name: "Chinese-CLIP",
        description: "Chinese-CLIP 是 CLIP 模型的中文版本。CLIP 通过对比学习方式，同时学习图像和文本的表示，并能够理解两者之间的语义关联。Chinese-CLIP 使用约 2 亿规模的中文图文对进行训练，其核心目标是解决中文场景下的跨模态检索、图像表示生成等任务。",
        tags: ["图文匹配"],
        date: "2026-03-16 19:22:14",
        badge: null
    },
    {
        name: "Swin-Transformer",
        description: "Swin-Transformer是针对于图片处理设计的基于Transformer架构的神经网络。该网络针对原始Transformer迁移到图片端后计算量过大，复用困难的问题，提出了新的swin-block以代替原有的attention架构。模型以窗口的attention方式极大地减少了图像不同区域间的互相响应，同时也避免了部分冗余信息的产生。最终，模型在减少了大量计算量的同时，在不同的视觉传统任务上也有了效果的提升。",
        tags: ["分类"],
        date: "2026-03-16 19:19:28",
        badge: "Beta"
    },
    {
        name: "Pi0",
        description: "Pi0是一款视觉-语言-动作(VLA)通用机器人大模型，它基于预训练视觉语言模型(VLM)和流匹配(Flow Matching)机制，能够将自然语言指令直接转换为机器人可执行的连续动作序列，从而精准控制机器人完成复杂、高灵巧度的操作任务。",
        tags: ["具身智能", "Hi3591PV100"],
        date: "2026-03-04 20:07:37",
        badge: null
    },
    {
        name: "ACT",
        description: "ACT（Action Chunking with Transformers）是面向机器人学习场景的高性能端到端动作控制模型。相比传统模块化机器人控制模型，ACT采用轻量化Transformer架构作为核心骨干进行动作表征学习，结合多模态感知融合模块和时序动作优化网络，在控制精度和实时响应速度上均有显著提升。",
        tags: ["具身智能"],
        date: "2026-03-03 10:30:33",
        badge: null
    },
    {
        name: "CRNN",
        description: "CRNN是卷积循环网络，本模型是一个基于其的中文 OCR 模型。",
        tags: ["OCR"],
        date: "2026-02-12 10:58:59",
        badge: "Beta"
    },
    {
        name: "GraspNet",
        description: "GraspNet是一种基于点云输入的多阶段抓取姿态预测模型，由抓取视角估计和抓取姿态生成两个阶段组成，通过特征提取、视角估计、局部特征提取、抓取参数估计和预测解码一系列处理，最终生成包含抓取评分、抓取宽度、抓取高度、抓取深度、旋转矩阵、抓取中心点和物体ID的预测结果，旨在解决机器人抓取任务中的6D抓取姿态估计问题。",
        tags: ["具身智能", "Hi3591PV100"],
        date: "2026-02-09 19:42:15",
        badge: "Beta"
    }
];

// Model data - Page 2
const page2Models = [
    {
        name: "MiniCPM-4v-0.5B",
        description: "MiniCPM-4v-0.5B: 小参数, 大智慧——端侧多模态模型 由面壁智能(OpenBMB)打造的MiniCPM-4v-0.5B, 以0.53B的精简参数量，在端侧设备上实现了卓越的图文理解与交互能力。专为边缘计算场景设计，让每一分算力都充分发挥价值。 三大核心优势： 1. 创新架构，轻装上阵 通过创新的稀疏感知训练和视觉压缩技术，实现 16:1 视觉特征压缩比，在保证高精度的同时，极大降低了推理算力消耗与内存占用。 2. 高能数据，以小博大 依托高密度数据体系，数据准备成本下降90%。通过汇聚全球高质量语料进行精细化对齐，用优质的数据训练模型，实现越级性能表现。 3. 高效训练，成本锐减 采用原创 WSD 调度策略与模型风洞技术，相比传统方案，搜索算力节省超99%，整体训练成本节省约60%，为端侧模型的持续迭代提供高效路径。 海思平台技术支撑： 现已适配 Hi3403V100 平台，持续生成速度达 21 tokens/s，为边缘侧设备提供流程、敏捷的智能视觉体验。",
        tags: ["VLM"],
        date: "2026-02-06 17:16:24",
        badge: "Beta"
    },
    {
        name: "FastSpeech2",
        description: "FastSpeech2 是一种高效的端到端语音合成模型。相比 FastSpeech，FastSpeech2 引入了多尺度时长预测器和能量 / 基频预测分支，优化了时长预测模块并新增韵律特征建模，在合成速度和语音自然度上均有大幅提升。",
        tags: ["文本转语音"],
        date: "2026-01-08 16:18:57",
        badge: "Beta"
    },
    {
        name: "CodeFormer",
        description: "CodeFormer 是一种基于码本查找 Transformer 的鲁棒盲人脸修复模型。相比传统方法，它通过生成对抗网络与量化编码技术，能有效处理模糊、噪声等多种退化问题，兼顾人脸修复质量与身份保真度，适用于盲人脸恢复场景。",
        tags: ["图像增强"],
        date: "2025-12-30 17:56:29",
        badge: null
    },
    {
        name: "FaceNet",
        description: "FaceNet 是一种基于深度卷积神经网络的端到端人脸识别与特征嵌入模型。相比传统基于手工特征或分阶段匹配的方法，它通过将人脸图像直接映射为固定维度的紧凑特征向量（Embedding），并采用三元组损失（Triplet Loss）优化特征相似度度量，能有效缩小类内差异、扩大类间距离，兼顾识别精度与推理效率，适用于身份验证、人脸检索、监控安防等大规模人脸识别场景。",
        tags: ["人脸识别"],
        date: "2025-12-29 10:37:55",
        badge: null
    },
    {
        name: "LRStereo-B",
        description: "LRStereo-B是一个轻量且鲁棒的双目立体匹配模型。它在开源模型(Raft-Stereo)的基础上做了大量的模型结构改进和重训。具体功能为输入标定好的左右目图像以及相关的相机参数，获得左目图像对应的深度图。",
        tags: ["双目深度"],
        date: "2025-12-26 20:41:00",
        badge: null
    },
    {
        name: "TinySam",
        description: "TinySAM 通过全阶段知识蒸馏、在线硬提示采样、量化等系列优化策略，构建轻量级 万物分割 模型，解决了原始 SAM 模型计算量大、部署困难的痛点，助力高效分割任务在资源受限场景下的应用。",
        tags: ["分割"],
        date: "2025-12-26 16:38:13",
        badge: "Beta"
    },
    {
        name: "YOLOv8s-OBB",
        description: "YOLOv8s-OBB 是 Ultralytics 推出的基于 YOLOv8 的旋转目标检测（Oriented Bounding Box, OBB）模型。相比于水平框检测，OBB 能够更准确地检测倾斜或不规则排列的目标（如航拍图像中的车辆、船只等）。该模型在 DOTA 数据集上进行了训练和验证。",
        tags: ["目标检测"],
        date: "2025-12-26 16:22:36",
        badge: null
    },
    {
        name: "PaddleOCRv4-rec",
        description: "PP-OCRv4识别模型在PP-OCRv3识别模型的基础上进一步升级。整体的框架保持了与PP-OCRv3识别模型相同的pipeline，分别进行了数据、网络结构、训练策略等方面的优化。",
        tags: ["OCR"],
        date: "2025-12-26 16:02:03",
        badge: "Beta"
    },
    {
        name: "PaddleOCRv4-det",
        description: "PP-OCRv4检测模型在PP-OCRv3检测模型的基础上，在网络结构，训练策略，蒸馏策略三个方面做了优化。首先，PP-OCRv4检测模型使用PP-LCNetV3替换MobileNetv3，并提出并行分支融合的PFhead结构；其次，训练时动态调整shrink ratio的比例；最后，PP-OCRv4对CML的蒸馏loss进行优化，进一步提升文字检测效果。",
        tags: ["OCR"],
        date: "2025-12-26 15:54:13",
        badge: "Beta"
    },
    {
        name: "YOLOv3",
        description: "YOLOv3是一种端到端的one-stage目标检测模型。相比YOLOv2，YOLOv3采用了一个新的backbone-Darknet-53来进行特征提取工作，这个新网络比Darknet-19更加强大，也比ResNet-101或者ResNet-152更加高效。",
        tags: ["目标检测"],
        date: "2025-12-26 15:43:35",
        badge: "Beta"
    },
    {
        name: "YOLOv10s",
        description: "YOLOv10 引入了一种新的实时目标检测方法，解决了以前YOLO 版本在后处理和模型架构方面的不足。通过消除非最大抑制NMS和优化各种模型组件，YOLOv10 显著降低了计算开销。本示例基于YOLOv10s。",
        tags: ["目标检测"],
        date: "2025-12-26 15:12:19",
        badge: "Beta"
    },
    {
        name: "HRNet",
        description: "HigherHRNet 是一种新型的自下而上人体姿态估计算法，它在训练阶段引入多分辨率监督机制，在推理阶段采用多分辨率聚合策略，不仅能有效应对自下而上多人姿态估计任务中的尺度变化难题，还可实现关键点的高精度定位，尤其在小尺寸人体目标的处理上表现突出。",
        tags: ["姿态估计"],
        date: "2025-12-26 10:20:26",
        badge: null
    }
];

// Combine all models
const modelsData = [...page1Models, ...page2Models];

// Gradient backgrounds for model cards
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    'linear-gradient(135deg, #9890e3 0%, #b1f4cb 100%)',
    'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)'
];

// Render models to the grid
function renderModels(models) {
    const grid = document.getElementById('modelGrid');
    if (!grid) return;
    
    grid.innerHTML = models.map((model, index) => `
        <div class="model-card">
            <div class="model-image" style="background: ${gradients[index % gradients.length]}">
                <span style="font-size: 48px; color: white;">🧠</span>
            </div>
            <div class="model-name">${model.name}</div>
            ${model.badge ? `<span class="model-badge">${model.badge}</span>` : ''}
            <div class="model-description">${model.description}</div>
            <div class="model-tags">
                ${model.tags.map(tag => `<span class="model-tag">${tag}</span>`).join('')}
            </div>
            <div class="model-meta">
                <span class="model-date">📅 ${model.date}</span>
                <span class="model-action">☆ 收藏</span>
            </div>
        </div>
    `).join('');
}

// Pagination
let currentPage = 1;
const pageSize = 12;
const totalItems = 47;
const totalPages = Math.ceil(totalItems / pageSize);

function renderPagination() {
    const pageNumbers = document.querySelector('.page-numbers');
    if (!pageNumbers) return;
    
    let html = '';
    for (let i = 1; i <= 4; i++) {
        html += `<li class="${i === currentPage ? 'active' : ''}">${i}</li>`;
    }
    pageNumbers.innerHTML = html;
    
    // Re-attach click handlers
    document.querySelectorAll('.page-numbers li').forEach(li => {
        li.addEventListener('click', function() {
            currentPage = parseInt(this.textContent);
            updatePage();
        });
    });
}

function updatePage() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageModels = modelsData.slice(start, end);
    renderModels(pageModels);
    renderPagination();
}

// Filter tag click handler
function initFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
            // TODO: Implement filtering logic
        });
    });
}

// Cookie banner close
function initCookieBanner() {
    const closeBtn = document.querySelector('.cookie-banner .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.querySelector('.cookie-banner').style.display = 'none';
        });
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.toLowerCase();
            const filtered = modelsData.filter(model => 
                model.name.toLowerCase().includes(query) ||
                model.description.toLowerCase().includes(query) ||
                model.tags.some(tag => tag.toLowerCase().includes(query))
            );
            renderModels(filtered);
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderModels(modelsData.slice(0, pageSize));
    renderPagination();
    initFilters();
    initCookieBanner();
    initSearch();
});
