// Model data - all 47 models with download links
const modelsData = [
    {
        name: "MobileNetV2",
        description: "MobileNetV2是对MobileNetV1的改进，是一种轻量级的神经网络。MobileNetV2保留了V1版本的深度可分离卷积，增加了线性瓶颈（Linear Bottleneck）和倒残差（Inverted Residual）。",
        tags: ["分类"],
        date: "2026-03-24 16:23:20",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/mobilenet_v2.om"
    },
    {
        name: "Vit-B-16",
        description: "Transformer 架构已广泛应用于自然语言处理领域。Vision Transformer（ViT）模型在计算机视觉领域中对CNN的依赖不是必需的，直接将其应用于图像块序列来进行图像分类时，也能得到和目前卷积网络相媲美的准确率。",
        tags: ["分类"],
        date: "2026-03-17 17:45:49",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/vit_b_16.om"
    },
    {
        name: "SuperPoint",
        description: "SuperPoint模型的全卷积神经网络架构对全尺寸图像进行操作，并在单次前向传递中产生伴随固定长度描述符的兴趣点检测。该模型有一个单一的共享编码器来处理和减少输入图像的维数。在编码器之后，该架构分成两个解码器头，它们学习任务特定权重。",
        tags: ["特征点检测"],
        date: "2026-03-16 21:11:02",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/superpoint.om"
    },
    {
        name: "DenseNet121",
        description: "DenseNet 针对 ResNet 的冗余结构提出了改进：让网络中的每一层和前面的所有层相连，同时把每一层设计的比较窄，使每一层学到的特征变少从而降低冗余。",
        tags: ["分类"],
        date: "2026-03-16 20:23:49",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/densenet121.om"
    },
    {
        name: "ShuffleNetV2",
        description: "ShuffleNetV2是Shufflenet的升级版本，作为轻量级网络，通过遵循降低网络的碎片程度、减少element-wise等设计准则，在保证精度的前提下进一步追求高性能。",
        tags: ["分类"],
        date: "2026-03-16 20:19:07",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/shufflenet_v2.om"
    },
    {
        name: "SqueezeNet1_1",
        description: "Squeezenet的设计采用了卷积替换、减少卷积通道数和降采样操作后置等策略，旨在在不大幅降低模型精度的前提下，最大程度的提高运算速度。",
        tags: ["分类"],
        date: "2026-03-16 19:24:13",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/squeezenet1_1.om"
    },
    {
        name: "Chinese-CLIP",
        description: "Chinese-CLIP 是 CLIP 模型的中文版本。CLIP 通过对比学习方式，同时学习图像和文本的表示，并能够理解两者之间的语义关联。",
        tags: ["图文匹配"],
        date: "2026-03-16 19:22:14",
        badge: null,
        category: "多模态",
        downloadUrl: "models/chinese_clip.om"
    },
    {
        name: "Swin-Transformer",
        description: "Swin-Transformer是针对于图片处理设计的基于Transformer架构的神经网络。模型以窗口的attention方式极大地减少了图像不同区域间的互相响应。",
        tags: ["分类"],
        date: "2026-03-16 19:19:28",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/swin_transformer.om"
    },
    {
        name: "Pi0",
        description: "Pi0是一款视觉-语言-动作(VLA)通用机器人大模型，它基于预训练视觉语言模型(VLM)和流匹配(Flow Matching)机制，能够将自然语言指令直接转换为机器人可执行的连续动作序列。",
        tags: ["具身智能", "Hi3591PV100"],
        date: "2026-03-04 20:07:37",
        badge: null,
        category: "具身智能",
        downloadUrl: "models/pi0.om"
    },
    {
        name: "ACT",
        description: "ACT（Action Chunking with Transformers）是面向机器人学习场景的高性能端到端动作控制模型。采用轻量化Transformer架构作为核心骨干进行动作表征学习。",
        tags: ["具身智能"],
        date: "2026-03-03 10:30:33",
        badge: null,
        category: "具身智能",
        downloadUrl: "models/act.om"
    },
    {
        name: "CRNN",
        description: "CRNN是卷积循环网络，本模型是一个基于其的中文 OCR 模型。",
        tags: ["OCR"],
        date: "2026-02-12 10:58:59",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/crnn.om"
    },
    {
        name: "GraspNet",
        description: "GraspNet是一种基于点云输入的多阶段抓取姿态预测模型，旨在解决机器人抓取任务中的6D抓取姿态估计问题。",
        tags: ["具身智能", "Hi3591PV100"],
        date: "2026-02-09 19:42:15",
        badge: "Beta",
        category: "具身智能",
        downloadUrl: "models/graspnet.om"
    },
    {
        name: "MiniCPM-4v-0.5B",
        description: "MiniCPM-4v-0.5B: 小参数, 大智慧——端侧多模态模型。以0.53B的精简参数量，在端侧设备上实现了卓越的图文理解与交互能力。",
        tags: ["VLM"],
        date: "2026-02-06 17:16:24",
        badge: "Beta",
        category: "自然语言处理",
        downloadUrl: "models/minicpm_4v.om"
    },
    {
        name: "FastSpeech2",
        description: "FastSpeech2 是一种高效的端到端语音合成模型。相比 FastSpeech，FastSpeech2 引入了多尺度时长预测器和能量/基频预测分支。",
        tags: ["文本转语音"],
        date: "2026-01-08 16:18:57",
        badge: "Beta",
        category: "音频",
        downloadUrl: "models/fastspeech2.om"
    },
    {
        name: "CodeFormer",
        description: "CodeFormer 是一种基于码本查找 Transformer 的鲁棒盲人脸修复模型。能有效处理模糊、噪声等多种退化问题。",
        tags: ["图像增强"],
        date: "2025-12-30 17:56:29",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/codeformer.om"
    },
    {
        name: "FaceNet",
        description: "FaceNet 是一种基于深度卷积神经网络的端到端人脸识别与特征嵌入模型。适用于身份验证、人脸检索、监控安防等大规模人脸识别场景。",
        tags: ["人脸识别"],
        date: "2025-12-29 10:37:55",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/facenet.om"
    },
    {
        name: "LRStereo-B",
        description: "LRStereo-B是一个轻量且鲁棒的双目立体匹配模型。输入标定好的左右目图像以及相关的相机参数，获得左目图像对应的深度图。",
        tags: ["双目深度"],
        date: "2025-12-26 20:41:00",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/lr_stereo_b.om"
    },
    {
        name: "TinySam",
        description: "TinySAM 通过全阶段知识蒸馏、在线硬提示采样、量化等系列优化策略，构建轻量级万物分割模型。",
        tags: ["分割"],
        date: "2025-12-26 16:38:13",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/tiny_sam.om"
    },
    {
        name: "YOLOv8s-OBB",
        description: "YOLOv8s-OBB 是 Ultralytics 推出的基于 YOLOv8 的旋转目标检测（OBB）模型。相比于水平框检测，OBB 能够更准确地检测倾斜或不规则排列的目标。",
        tags: ["目标检测"],
        date: "2025-12-26 16:22:36",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/yolov8s_obb.om"
    },
    {
        name: "PaddleOCRv4-rec",
        description: "PP-OCRv4识别模型在PP-OCRv3识别模型的基础上进一步升级。整体的框架保持了与PP-OCRv3识别模型相同的pipeline。",
        tags: ["OCR"],
        date: "2025-12-26 16:02:03",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/paddleocrv4_rec.om"
    },
    {
        name: "PaddleOCRv4-det",
        description: "PP-OCRv4检测模型在PP-OCRv3检测模型的基础上，在网络结构，训练策略，蒸馏策略三个方面做了优化。",
        tags: ["OCR"],
        date: "2025-12-26 15:54:13",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/paddleocrv4_det.om"
    },
    {
        name: "YOLOv3",
        description: "YOLOv3是一种端到端的one-stage目标检测模型。采用了一个新的backbone-Darknet-53来进行特征提取工作。",
        tags: ["目标检测"],
        date: "2025-12-26 15:43:35",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/yolov3.om"
    },
    {
        name: "YOLOv10s",
        description: "YOLOv10 引入了一种新的实时目标检测方法，解决了以前YOLO 版本在后处理和模型架构方面的不足。",
        tags: ["目标检测"],
        date: "2025-12-26 15:12:19",
        badge: "Beta",
        category: "计算机视觉",
        downloadUrl: "models/yolov10s.om"
    },
    {
        name: "HRNet",
        description: "HigherHRNet 是一种新型的自下而上人体姿态估计算法。它在训练阶段引入多分辨率监督机制，在推理阶段采用多分辨率聚合策略。",
        tags: ["姿态估计"],
        date: "2025-12-26 10:20:26",
        badge: null,
        category: "计算机视觉",
        downloadUrl: "models/hrnet.om"
    }
];

// Get model name from URL
function getModelNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
}

// Render model detail
function renderModelDetail() {
    const modelName = getModelNameFromURL();
    if (!modelName) {
        document.getElementById('modelName').textContent = '未找到模型';
        return;
    }
    
    const model = modelsData.find(m => m.name === modelName);
    if (!model) {
        document.getElementById('modelName').textContent = '未找到模型: ' + modelName;
        return;
    }
    
    document.getElementById('modelName').textContent = model.name;
    document.getElementById('modelDescription').textContent = model.description;
    document.getElementById('modelDate').textContent = model.date;
    document.getElementById('modelCategory').textContent = model.category || model.tags[0];
    
    if (model.badge) {
        const badge = document.getElementById('modelBadge');
        badge.textContent = model.badge;
        badge.style.display = 'inline-block';
    }
    
    const tagsContainer = document.getElementById('modelTags');
    tagsContainer.innerHTML = model.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('');
    
    // Setup download link
    const downloadLink = document.getElementById('downloadLink');
    if (downloadLink && model.downloadUrl) {
        downloadLink.href = model.downloadUrl;
    }
    
    // Update page title
    document.title = `${model.name} - 华为海思开发者门户`;
}

// Initialize
document.addEventListener('DOMContentLoaded', renderModelDetail);
