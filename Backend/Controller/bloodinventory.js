const BloodInventory = require('../Model/bloodinventorymodel');

const acceptBloodRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        let bloodInventory = await BloodInventory.findOne({ bloodGroup: request.requiredbloodgroup });
        if (!bloodInventory) {
            return res.status(400).json({ message: 'Insufficient blood inventory' });
        }

        if (bloodInventory.count <= 0) {
            return res.status(400).json({ message: 'Insufficient blood inventory' });
        }

        request.status = 'Accepted';
        await request.save();

        bloodInventory.count -= 1;
        await bloodInventory.save();

        res.status(200).json({ message: 'Request accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};