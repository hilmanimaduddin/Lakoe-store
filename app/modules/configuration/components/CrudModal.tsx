import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Image,
  ModalFooter,
  HStack,
  Box,
} from '@chakra-ui/react';
import Edit from '../../../assets/icon-pack/edit.svg';
import Trash from '../../../assets/icon-pack/trash.svg';
import CloseCircle from '../../../assets/icon-pack/close-circle.svg';
import type { ITemplateMessage } from '~/interfaces/TemplateMessage';
import { Form } from '@remix-run/react';
import React, { useState } from 'react';
import Tiptap from '../hooks/Nextiptap';

export function DeleteButton(props: ITemplateMessage) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button
        borderRadius={'full'}
        bg={'white'}
        border={'1px solid #aeaeae'}
        p={'0px'}
        size={'sm'}
        onClick={onOpen}
      >
        <Image w={'15px'} src={Trash} />
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={'xl'}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent pl={6} pr={6}>
          <Form method="post">
            <Flex
              pt={4}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={3}
            >
              <Text fontSize={'xl'} fontWeight={'medium'}>
                Hapus Template Pesan
              </Text>
              <Button
                display={'flex'}
                alignItems={'center'}
                justifyContent={'end'}
                onClick={onClose}
                variant={'link'}
              >
                <Image w={'30px'} src={CloseCircle} />
              </Button>
            </Flex>
            <HStack spacing="3px">
              <Text>Apakah kamu yakin untuk menghapus</Text>
              <Text display={'flex'}>
                <Text as={'b'}>{props.name}</Text>?
              </Text>
            </HStack>
            <Text>
              Sebab, kamu tidak akan dapat mengembalikan template pesan yang
            </Text>
            <Text>sudah dihapus.</Text>
            <Input hidden name="id" value={props.id} />
            <Flex justifyContent={'flex-end'} pb={4} mt={5}>
              <Button
                variant={'outline'}
                borderRadius={'full'}
                mr={2}
                onClick={onClose}
              >
                Batalkan
              </Button>
              <Button
                type="submit"
                value="delete"
                name="action"
                colorScheme="blue"
                color={'whiteAlpha.900'}
                borderRadius={'full'}
                onClick={onClose}
              >
                Ya, Hapus
              </Button>
            </Flex>
          </Form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export function UpdateButton(props: ITemplateMessage) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = React.useState(props.name);
  const handleInputChange = (event: any) => setTitle(event.target.value);
  const [newContent, setNewcontent] = React.useState(props.content);

  return (
    <>
      <Button
        onClick={onOpen}
        borderRadius={'full'}
        bg={'white'}
        border={'1px solid #aeaeae'}
        p={'0px'}
        size={'sm'}
      >
        <Image w={'15px'} src={Edit} />
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={'lg'}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent pl={6} pr={6}>
          <Form method="patch">
            <Flex
              pt={4}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={3}
            >
              <Text fontSize={'xl'} fontWeight={'medium'}>
                Ubah Template Pesan
              </Text>
              <Button
                display={'flex'}
                alignItems={'center'}
                justifyContent={'end'}
                onClick={onClose}
                variant={'link'}
              >
                <Image w={'30px'} src={CloseCircle} />
              </Button>
            </Flex>
            <Input hidden name="id" value={props.id} />
            <FormControl isRequired>
              <FormLabel fontWeight={'normal'}>Judul Pesan</FormLabel>
              <Input
                name="updatedName"
                onChange={handleInputChange}
                value={title}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel fontWeight={'normal'}>Detail Isi Pesan</FormLabel>
              <Input hidden name="updatedContent" value={newContent} />
              <Tiptap content={newContent} setContent={setNewcontent} />
            </FormControl>
            <Flex justifyContent={'flex-end'} pb={4} mt={'37px'}>
              <Button
                variant="outline"
                width={'100px'}
                mr={2}
                borderRadius={'full'}
                onClick={onClose}
              >
                Batalkan
              </Button>
              <Button
                color={'whiteAlpha.900'}
                width={'100px'}
                borderRadius={'full'}
                colorScheme="blue"
                onClick={onClose}
                type="submit"
                value="update"
                name="action"
              >
                Simpan
              </Button>
            </Flex>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}

export function CreateButton(data: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const updateState = (value: any) => {
    if (value === 'namaPembeli') {
      setValue((prevState) => prevState + '[Nama Pembeli]');
    } else if (value === 'namaProduk') {
      setValue((prevState) => prevState + '[Nama Produk]');
    } else if (value === 'namaToko') {
      setValue((prevState) => prevState + '[Nama Toko]');
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        fontSize={'12px'}
        size="sm"
        bg={'#0086B4'}
        color={'white'}
        borderRadius={'full'}
      >
        Buat Template
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={5} py={4}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              fontSize={'18px'}
              fontStyle={'normal'}
              color={'text-dark'}
              fontWeight={'bold'}
            >
              Buat Template Pesan Baru
            </Text>
            <Button
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              onClick={onClose}
              variant={'link'}
            >
              <Image w={'30px'} src={CloseCircle} />
            </Button>
          </Box>
          <Form method="post">
            <Box>
              <Input type="hidden" value={data.storeId} name="storeId" />
            </Box>
            <Box fontFamily={'Plus Jakarta Sans'} py={3}>
              <FormControl id="order-id" isRequired mb={5}>
                <FormLabel>Judul Pesan</FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder=" Pesanan Konfirmasi Pengiriman"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Detail Isi Pesanan</FormLabel>
              </FormControl>

              <Box
                alignItems={'flex-start'}
                display={'flex'}
                maxW={'fit-content'}
                borderRadius={'50%'}
                gap={'3'}
              >
                <Button
                  bg={'white'}
                  name="storeId"
                  height={'30px'}
                  onClick={() => updateState('namaPembeli')}
                  color={'var(--text-dark, #1D1D1D)'}
                  borderRadius={'var(--rounded-full, 9999px)'}
                  border={'1px solid var(--gray-300, #D5D5D5)'}
                >
                  <Text color={'gray.500'} fontSize={'14px'}>
                    Nama Pembeli
                  </Text>
                </Button>
                <Button
                  name="storeId"
                  value={'ProdukName'}
                  bg={'white'}
                  height={'30px'}
                  borderRadius={'50px'}
                  onClick={() => updateState('namaProduk')}
                  border={'1px solid var(--gray-300, #D5D5D5)'}
                >
                  <Text fontSize={'14px'} color={'gray.500'}>
                    Nama Produk
                  </Text>
                </Button>
                <Button
                  name="storeId"
                  value={'namaToko'}
                  borderRadius={'50px'}
                  bg={'white'}
                  onClick={() => updateState('namaToko')}
                  border={'1px solid var(--gray-300, #D5D5D5)'}
                  height={'30px'}
                >
                  <Text fontSize={'14px'} color={'gray.500'}>
                    Nama Toko
                  </Text>
                </Button>
              </Box>
              <Box mt={'10px'}>
                <Textarea
                  name="content"
                  value={value}
                  height={'150px'}
                  color={'gray.500'}
                  placeholder="Tuliskan Pesanmu"
                  onChange={handleChange}
                />
              </Box>
            </Box>

            <ModalFooter gap={'3'}>
              <Button
                height={'40px'}
                width={'103px'}
                variant="ghost"
                onClick={onClose}
                gap={'var(--1, 4px)'}
                borderRadius={'50px'}
                border={'1px solid var(--gray-300, #D5D5D5)'}
              >
                Batalkan
              </Button>
              <Button
                type="submit"
                onClick={onClose}
                height={'40px'}
                width={'103px'}
                colorScheme="blue"
                borderRadius={'50px'}
                value="create"
                name="action"
              >
                Simpan
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}