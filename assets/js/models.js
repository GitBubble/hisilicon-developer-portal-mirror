// Model data from the ModelZoo page
const modelsData = [
    {
        name: "MobileNetV2",
        description: "MobileNetV2是对MobileNetV1的改进，是一种轻量级的神经网络。MobileNetV2保留了V1版本的深度可分离卷积，增加了线性瓶颈（Linear Bottleneck）和倒残差（Inverted Residual）。",
        tags: ["分类"],
        date: "2026-03-24 16:23:20",
        image: null,
        badge: null
    },
    {
        name: "Vit-B-16",
        description: "Transformer 架构已广泛应用于自然语言处理领域。Vision Transformer（ViT）模型在计算机视觉领域中对CNN的依赖不是必需的，直接将其应用于图像块序列来进行图像分类时，也能得到和目前卷积网络相媲美的准确率。",
        tags: ["分类"],
        date: "2026-03-17 17:45:49",
        image: null,
        badge: "Beta"
    },
    {
        name: "SuperPoint",
        description: "SuperPoint模型的全卷积神经网络架构对全尺寸图像进行操作，并在单次前向传递中产生伴随固定长度描述符的兴趣点检测。该模型有一个单一的共享编码器来处理和减少输入图像的维数。在编码器之后，该架构分成两个解码器"头"，它们学习任务特定权重——一个用于兴趣点检测，另一个用于感兴趣点描述。大多数网络参数在两个任务之间共享，这与传统系统不同，传统系统首先检测兴趣点，然后计算描述符，并且缺乏跨两个任务共享计算和表示的能力。",
        tags: ["特征点检测"],
        date: "2026-03-16 21:11:02",
        image: null,
        badge: null
    },
    {
        name: "DenseNet121",
        description: "DenseNet 针对 ResNet 的冗余结构提出了改进：让网络中的每一层和前面的所有层相连，同时把每一层设计的比较窄，使每一层学到的特征变少从而降低冗余。除了减少参数量之外，该结构还有减轻梯度消失问题、增强特征传播等优点。",
        tags: ["分类"],
        date: "2026-03-16 20:23:49",
        image: null,
        badge: null
    },
    {
        name: "ShuffleNetV2",
        description: "ShuffleNetV2是Shufflenet的升级版本，作为轻量级网络，通过遵循降低网络的碎片程度、减少element-wise等设计准则，在保证精度的前提下进一步追求高性能。",
        tags: ["分类"],
        date: "2026-03-16 20:19:07",
        image: null,
        badge: null
    },
    {
        name: "SqueezeNet1_1",
        description: "Squeezenet的设计采用了卷积替换、减少卷积通道数和降采样操作后置等策略，旨在在不大幅降低模型精度的前提下，最大程度的提高运算速度。",
        tags: ["分类"],
        date: "2026-03-16 19:24:13",
        image: null,
        badge: null
    },
    {
        name: "Chinese-CLIP",
        description: "Chinese-CLIP 是 CLIP 模型的中文版本。CLIP 通过对比学习方式，同时学习图像和文本的表示，并能够理解两者之间的语义关联。Chinese-CLIP 使用约 2 亿规模的中文图文对进行训练，其核心目标是解决中文场景下的跨模态检索、图像表示生成等任务。",
        tags: ["图文匹配"],
        date: "2026-03-16 19:22:14",
        image: null,
        badge: null
    },
    {
        name: "Swin-Transformer",
        description: "Swin-Transformer是针对于图片处理设计的基于Transformer架构的神经网络。该网络针对原始Transformer迁移到图片端后计算量过大，复用困难的问题，提出了新的swin-block以代替原有的attention架构。模型以窗口的attention方式极大地减少了图像不同区域间的互相响应，同时也避免了部分冗余信息的产生。最终，模型在减少了大量计算量的同时，在不同的视觉传统任务上也有了效果的提升。",
        tags: ["分类"],
        date: "2026-03-16 19:19:28",
        image: null,
        badge: "Beta"
    },
    {
        name: "Pi0",
        description: "Pi0是一款视觉-语言-动作(VLA)通用机器人大模型，它基于预训练视觉语言模型(VLM)和流匹配(Flow Matching)机制，能够将自然语言指令直接转换为机器人可执行的连续动作序列，从而精准控制机器人完成复杂、高灵巧度的操作任务。",
        tags: ["具身智能", "Hi3591PV100"],
        date: "2026-03-04 20:07:37",
        image: null,
        badge: null
    },
    {
        name: "ACT",
        description: "ACT（Action Chunking with Transformers）是面向机器人学习场景的高性能端到端动作控制模型。相比传统模块化机器人控制模型，ACT采用轻量化Transformer架构作为核心骨干进行动作表征学习，结合多模态感知融合模块和时序动作优化网络，在控制精度和实时响应速度上均有显著提升。",
        tags: ["具身智能"],
        date: "2026-03-03 10:30:33",
        image: null,
        badge: null
    },
    {
        name: "CRNN",
        description: "CRNN是卷积循环网络，本模型是一个基于其的中文 OCR 模型。",
        tags: ["OCR"],
        date: "2026-02-12 10:58:59",
        image: null,
        badge: "Beta"
    },
    {
        name: "GraspNet",
        description: "GraspNet是一种基于点云输入的多阶段抓取姿态预测模型，由抓取视角估计和抓取姿态生成两个阶段组成，通过特征提取、视角估计、局部特征提取、抓取参数估计和预测解码一系列处理，最终生成包含抓取评分、抓取宽度、抓取高度、抓取深度、旋转矩阵、抓取中心点和物体ID的预测结果，旨在解决机器人抓取任务中的6D抓取姿态估计问题。",
        tags: ["具身智能", "Hi3591PV100"],
        date: "2026-02-09 19:42:15",
        image: null,
        badge: "Beta"
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { modelsData };
}
