import messageTransmitter from '../../../src/helpers/message-transmitter/index';

describe('messageTransmitter', () => {
    let transmitter: ReturnType<typeof messageTransmitter>;

    beforeEach(() => {
        transmitter = messageTransmitter();
    });

    describe('register', () => {
        it('should register a listener and return a UUID', () => {
            const handleMessage = jest.fn();
            const listenerId = transmitter.register('testKey', handleMessage);

            expect(typeof listenerId).toBe('string');
            // UUID v4 format validation
            expect(listenerId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });
    });

    describe('unsubscribe', () => {
        it('should remove a listener when valid listenerId is provided', () => {
            const handleMessage = jest.fn();
            const listenerId = transmitter.register('testKey', handleMessage);

            transmitter.unsubscribe(listenerId);

            // Broadcast a message to verify the listener was removed
            transmitter.broadcast({ testKey: 'test' });
            expect(handleMessage).not.toHaveBeenCalled();
        });

        it('should handle unsubscribe with invalid listenerId', () => {
            const handleMessage = jest.fn();
            transmitter.register('testKey', handleMessage);

            // Should not throw error when trying to unsubscribe non-existent listener
            expect(() => transmitter.unsubscribe('invalid-id')).not.toThrow();
        });
    });

    describe('clearAllListener', () => {
        it('should remove all registered listeners', () => {
            const handleMessage1 = jest.fn();
            const handleMessage2 = jest.fn();

            transmitter.register('key1', handleMessage1);
            transmitter.register('key2', handleMessage2);

            transmitter.clearAllListener();

            // Broadcast messages to verify all listeners were removed
            transmitter.broadcast({ key1: 'test', key2: 'test' });

            expect(handleMessage1).not.toHaveBeenCalled();
            expect(handleMessage2).not.toHaveBeenCalled();
        });
    });

    describe('broadcast', () => {
        it('should trigger registered listeners when matching message key exists', () => {
            const handleMessage1 = jest.fn();
            const handleMessage2 = jest.fn();

            transmitter.register('key1', handleMessage1);
            transmitter.register('key2', handleMessage2);

            const message = { key1: 'value1', key2: 'value2' };
            transmitter.broadcast(message);

            expect(handleMessage1).toHaveBeenCalledWith(message);
            expect(handleMessage2).toHaveBeenCalledWith(message);
        });

        it('should not trigger listeners when message key does not match', () => {
            const handleMessage = jest.fn();
            transmitter.register('key1', handleMessage);

            transmitter.broadcast({ otherKey: 'value' });

            expect(handleMessage).not.toHaveBeenCalled();
        });

        it('should handle multiple listeners for the same message key', () => {
            const handleMessage1 = jest.fn();
            const handleMessage2 = jest.fn();

            transmitter.register('sameKey', handleMessage1);
            transmitter.register('sameKey', handleMessage2);

            const message = { sameKey: 'value' };
            transmitter.broadcast(message);

            expect(handleMessage1).toHaveBeenCalledWith(message);
            expect(handleMessage2).toHaveBeenCalledWith(message);
        });
    });
});